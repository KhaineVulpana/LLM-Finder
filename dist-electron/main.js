import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import si from "systeminformation";
async function getSystemSpecs() {
  const [cpu, mem, graphics, osInfo] = await Promise.all([
    si.cpu(),
    si.mem(),
    si.graphics(),
    si.osInfo()
  ]);
  const gpuControllers = graphics.controllers.map((controller) => ({
    model: controller.model || "Unknown GPU",
    vram: controller.vram || 0,
    vramGB: Math.round((controller.vram || 0) / 1024)
  }));
  return {
    cpu: {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      cores: cpu.cores,
      physicalCores: cpu.physicalCores,
      speed: cpu.speed
    },
    memory: {
      total: mem.total,
      totalGB: Math.round(mem.total / 1024 ** 3)
    },
    gpu: {
      controllers: gpuControllers,
      hasGPU: gpuControllers.length > 0 && gpuControllers.some((g) => g.vram > 0)
    },
    platform: osInfo.platform
  };
}
const llmDatabase = [
  {
    name: "Llama 3.3 70B Instruct",
    size: "40-140GB",
    params: "70B",
    ramRequired: 80,
    vramRequired: 48,
    quantization: "Q4_K_M recommended, Q2_K for lower VRAM",
    useCase: "General purpose, coding, reasoning",
    pros: [
      "Excellent reasoning and coding abilities",
      "Very strong instruction following",
      "Good context window (128k)",
      "State-of-the-art performance for size"
    ],
    cons: [
      "Requires significant VRAM/RAM",
      "Slower inference on consumer hardware",
      "Large download size"
    ],
    downloadUrl: "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Qwen 2.5 32B Instruct",
    size: "20-65GB",
    params: "32B",
    ramRequired: 40,
    vramRequired: 24,
    quantization: "Q4_K_M or Q5_K_M recommended",
    useCase: "Multilingual, coding, math, general tasks",
    pros: [
      "Excellent multilingual support (29+ languages)",
      "Strong coding and math capabilities",
      "Good balance of performance and size",
      "Fast inference speed"
    ],
    cons: [
      "May require careful prompt engineering",
      "Less known than Llama models",
      "Moderate VRAM requirements"
    ],
    downloadUrl: "https://huggingface.co/Qwen/Qwen2.5-32B-Instruct",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Mistral 7B Instruct v0.3",
    size: "4-15GB",
    params: "7B",
    ramRequired: 8,
    vramRequired: 6,
    quantization: "Q4_K_M or Q5_K_M, Q8 for quality",
    useCase: "General purpose, fast inference, low resource",
    pros: [
      "Fast inference on consumer hardware",
      "Low VRAM/RAM requirements",
      "Good instruction following",
      "Efficient and practical"
    ],
    cons: [
      "Less capable than larger models",
      "May struggle with complex reasoning",
      "Limited context window compared to newer models"
    ],
    downloadUrl: "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Phi-4",
    size: "8-15GB",
    params: "14B",
    ramRequired: 16,
    vramRequired: 10,
    quantization: "Q4_K_M recommended",
    useCase: "Reasoning, math, coding on limited hardware",
    pros: [
      "Exceptional performance for size",
      "Strong reasoning and math",
      "Runs well on consumer GPUs",
      "Microsoft backed and well-optimized"
    ],
    cons: [
      "Smaller context window",
      "May be verbose at times",
      "Newer model with less community testing"
    ],
    downloadUrl: "https://huggingface.co/microsoft/phi-4",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "DeepSeek-R1",
    size: "8-40GB",
    params: "7B-32B variants",
    ramRequired: 20,
    vramRequired: 12,
    quantization: "Q4_K_M or Q5_K_M",
    useCase: "Advanced reasoning, chain-of-thought, problem solving",
    pros: [
      "Excellent reasoning capabilities",
      "Shows step-by-step thinking",
      "Good for complex problem solving",
      "Multiple size variants available"
    ],
    cons: [
      "Can be verbose with reasoning steps",
      "Slower due to chain-of-thought",
      "Newer architecture, less community support"
    ],
    downloadUrl: "https://huggingface.co/deepseek-ai/DeepSeek-R1",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Llama 3.2 3B Instruct",
    size: "2-6GB",
    params: "3B",
    ramRequired: 4,
    vramRequired: 3,
    quantization: "Q4_K_M, can run Q8 on 4GB",
    useCase: "Edge devices, low-end hardware, quick tasks",
    pros: [
      "Very low resource requirements",
      "Fast inference even on CPU",
      "Good for simple tasks and chat",
      "Can run on laptops without GPU"
    ],
    cons: [
      "Limited reasoning abilities",
      "Not suitable for complex tasks",
      "Smaller context window",
      "May produce inconsistent outputs"
    ],
    downloadUrl: "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Gemma 2 9B Instruct",
    size: "5-18GB",
    params: "9B",
    ramRequired: 12,
    vramRequired: 8,
    quantization: "Q4_K_M or Q5_K_M",
    useCase: "Google-optimized tasks, safe outputs, general use",
    pros: [
      "Strong safety filters built-in",
      "Good instruction following",
      "Efficient architecture",
      "Regular updates from Google"
    ],
    cons: [
      "May refuse some legitimate queries due to safety",
      "Less flexible than uncensored models",
      "Moderate resource requirements"
    ],
    downloadUrl: "https://huggingface.co/google/gemma-2-9b-it",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Nous Hermes 2 Mixtral 8x7B",
    size: "26-90GB",
    params: "47B (MoE)",
    ramRequired: 48,
    vramRequired: 30,
    quantization: "Q4_K_M recommended, Q3_K_M for lower VRAM",
    useCase: "Creative writing, roleplay, general tasks",
    pros: [
      "Mixture of Experts architecture (efficient)",
      "Creative and coherent outputs",
      "Good at following complex instructions",
      "Uncensored model variant available"
    ],
    cons: [
      "Large model size",
      "Requires significant VRAM",
      "Can be slower than dense models",
      "MoE architecture needs special support"
    ],
    downloadUrl: "https://huggingface.co/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Yi 34B Chat",
    size: "20-68GB",
    params: "34B",
    ramRequired: 40,
    vramRequired: 24,
    quantization: "Q4_K_M or Q5_K_M",
    useCase: "Long context tasks, multilingual, analysis",
    pros: [
      "Excellent long context handling (200k)",
      "Strong multilingual capabilities",
      "Good reasoning for size",
      "Competitive with larger models"
    ],
    cons: [
      "Requires significant resources",
      "Less community content than Llama",
      "Can be slow on consumer hardware"
    ],
    downloadUrl: "https://huggingface.co/01-ai/Yi-34B-Chat",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  },
  {
    name: "Llama 3.1 8B Instruct",
    size: "4-16GB",
    params: "8B",
    ramRequired: 10,
    vramRequired: 6,
    quantization: "Q4_K_M, Q5_K_M, or Q8_0",
    useCase: "General purpose, balanced performance/speed",
    pros: [
      "Good balance of capability and speed",
      "128k context window",
      "Strong instruction following",
      "Wide framework support",
      "Can run on mid-range hardware"
    ],
    cons: [
      "Outperformed by newer models in its class",
      "Not as efficient as specialized smaller models",
      "May struggle with very complex reasoning"
    ],
    downloadUrl: "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
    framework: ["llama.cpp", "Ollama", "LM Studio", "text-generation-webui"],
    requiresGPU: false
  }
];
function recommendModels(specs) {
  const recommendations = [];
  for (const model of llmDatabase) {
    let score = 100;
    let reasoning = "";
    const ramAvailable = specs.memory.totalGB;
    const hasGPU = specs.gpu.hasGPU;
    const vramAvailable = hasGPU ? Math.max(...specs.gpu.controllers.map((g) => g.vramGB)) : 0;
    if (model.requiresGPU && !hasGPU) {
      continue;
    }
    if (model.ramRequired > ramAvailable) {
      continue;
    }
    if (model.vramRequired && hasGPU && model.vramRequired > vramAvailable) {
      continue;
    }
    const ramUtilization = model.ramRequired / ramAvailable * 100;
    if (ramUtilization > 90) {
      score -= 30;
      reasoning = "High RAM usage - may cause system slowdown. ";
    } else if (ramUtilization > 75) {
      score -= 15;
      reasoning = "Significant RAM usage - close other apps for best performance. ";
    } else if (ramUtilization < 25) {
      score += 10;
      reasoning = "Low RAM usage - will run very smoothly. ";
    } else if (ramUtilization < 50) {
      score += 5;
      reasoning = "Good RAM efficiency. ";
    }
    if (hasGPU && model.vramRequired) {
      const vramUtilization = model.vramRequired / vramAvailable * 100;
      if (vramUtilization > 90) {
        score -= 20;
        reasoning += "Near max VRAM usage. ";
      } else if (vramUtilization > 75) {
        score -= 10;
        reasoning += "High VRAM usage. ";
      } else if (vramUtilization < 50) {
        score += 15;
        reasoning += "Excellent GPU fit - fast inference expected. ";
      } else {
        score += 5;
        reasoning += "Good GPU fit. ";
      }
    } else if (!hasGPU) {
      if (parseInt(model.params) <= 7) {
        score += 10;
        reasoning += "CPU-friendly size. ";
      } else if (parseInt(model.params) <= 13) {
        score -= 5;
        reasoning += "CPU inference will be slower. ";
      } else {
        score -= 15;
        reasoning += "CPU inference will be very slow - consider GPU. ";
      }
    }
    if (specs.memory.totalGB >= 64 && parseInt(model.params) >= 30) {
      score += 10;
      reasoning += "Your high RAM enables larger, more capable models. ";
    }
    if (hasGPU && vramAvailable >= 24 && parseInt(model.params) >= 30) {
      score += 10;
      reasoning += "Your GPU can handle high-end models. ";
    }
    recommendations.push({
      ...model,
      score,
      reasoning: reasoning.trim()
    });
  }
  recommendations.sort((a, b) => b.score - a.score);
  const topRecommendations = recommendations.slice(0, 10);
  return topRecommendations;
}
const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
let mainWindow = null;
function createWindow() {
  if (mainWindow) {
    return;
  }
  const preloadPath = path.join(__dirname$1, "preload.js");
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1e3,
    minHeight: 700,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    backgroundColor: "#0f172a",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#0f172a",
      symbolColor: "#ffffff",
      height: 40
    }
  });
  const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";
  if (process.env.NODE_ENV !== "production") {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname$1, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.handle("get-system-specs", async () => {
  try {
    const specs = await getSystemSpecs();
    return { success: true, data: specs };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
});
ipcMain.handle("get-recommendations", async (_, specs) => {
  try {
    const recommendations = recommendModels(specs);
    return { success: true, data: recommendations };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
});
