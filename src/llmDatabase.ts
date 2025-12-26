export interface LLMModel {
  name: string;
  size: string;
  params: string;
  ramRequired: number;
  vramRequired?: number;
  quantization?: string;
  useCase: string;
  pros: string[];
  cons: string[];
  downloadUrl?: string;
  framework: string[];
  requiresGPU: boolean;
}

export const llmDatabase: LLMModel[] = [
  {
    name: 'Llama 3.3 70B Instruct',
    size: '40-140GB',
    params: '70B',
    ramRequired: 80,
    vramRequired: 48,
    quantization: 'Q4_K_M recommended, Q2_K for lower VRAM',
    useCase: 'General purpose, coding, reasoning',
    pros: [
      'Excellent reasoning and coding abilities',
      'Very strong instruction following',
      'Good context window (128k)',
      'State-of-the-art performance for size'
    ],
    cons: [
      'Requires significant VRAM/RAM',
      'Slower inference on consumer hardware',
      'Large download size'
    ],
    downloadUrl: 'https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Qwen 2.5 32B Instruct',
    size: '20-65GB',
    params: '32B',
    ramRequired: 40,
    vramRequired: 24,
    quantization: 'Q4_K_M or Q5_K_M recommended',
    useCase: 'Multilingual, coding, math, general tasks',
    pros: [
      'Excellent multilingual support (29+ languages)',
      'Strong coding and math capabilities',
      'Good balance of performance and size',
      'Fast inference speed'
    ],
    cons: [
      'May require careful prompt engineering',
      'Less known than Llama models',
      'Moderate VRAM requirements'
    ],
    downloadUrl: 'https://huggingface.co/Qwen/Qwen2.5-32B-Instruct',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Mistral 7B Instruct v0.3',
    size: '4-15GB',
    params: '7B',
    ramRequired: 8,
    vramRequired: 6,
    quantization: 'Q4_K_M or Q5_K_M, Q8 for quality',
    useCase: 'General purpose, fast inference, low resource',
    pros: [
      'Fast inference on consumer hardware',
      'Low VRAM/RAM requirements',
      'Good instruction following',
      'Efficient and practical'
    ],
    cons: [
      'Less capable than larger models',
      'May struggle with complex reasoning',
      'Limited context window compared to newer models'
    ],
    downloadUrl: 'https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Phi-4',
    size: '8-15GB',
    params: '14B',
    ramRequired: 16,
    vramRequired: 10,
    quantization: 'Q4_K_M recommended',
    useCase: 'Reasoning, math, coding on limited hardware',
    pros: [
      'Exceptional performance for size',
      'Strong reasoning and math',
      'Runs well on consumer GPUs',
      'Microsoft backed and well-optimized'
    ],
    cons: [
      'Smaller context window',
      'May be verbose at times',
      'Newer model with less community testing'
    ],
    downloadUrl: 'https://huggingface.co/microsoft/phi-4',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'DeepSeek-R1',
    size: '8-40GB',
    params: '7B-32B variants',
    ramRequired: 20,
    vramRequired: 12,
    quantization: 'Q4_K_M or Q5_K_M',
    useCase: 'Advanced reasoning, chain-of-thought, problem solving',
    pros: [
      'Excellent reasoning capabilities',
      'Shows step-by-step thinking',
      'Good for complex problem solving',
      'Multiple size variants available'
    ],
    cons: [
      'Can be verbose with reasoning steps',
      'Slower due to chain-of-thought',
      'Newer architecture, less community support'
    ],
    downloadUrl: 'https://huggingface.co/deepseek-ai/DeepSeek-R1',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Llama 3.2 3B Instruct',
    size: '2-6GB',
    params: '3B',
    ramRequired: 4,
    vramRequired: 3,
    quantization: 'Q4_K_M, can run Q8 on 4GB',
    useCase: 'Edge devices, low-end hardware, quick tasks',
    pros: [
      'Very low resource requirements',
      'Fast inference even on CPU',
      'Good for simple tasks and chat',
      'Can run on laptops without GPU'
    ],
    cons: [
      'Limited reasoning abilities',
      'Not suitable for complex tasks',
      'Smaller context window',
      'May produce inconsistent outputs'
    ],
    downloadUrl: 'https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Gemma 2 9B Instruct',
    size: '5-18GB',
    params: '9B',
    ramRequired: 12,
    vramRequired: 8,
    quantization: 'Q4_K_M or Q5_K_M',
    useCase: 'Google-optimized tasks, safe outputs, general use',
    pros: [
      'Strong safety filters built-in',
      'Good instruction following',
      'Efficient architecture',
      'Regular updates from Google'
    ],
    cons: [
      'May refuse some legitimate queries due to safety',
      'Less flexible than uncensored models',
      'Moderate resource requirements'
    ],
    downloadUrl: 'https://huggingface.co/google/gemma-2-9b-it',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Nous Hermes 2 Mixtral 8x7B',
    size: '26-90GB',
    params: '47B (MoE)',
    ramRequired: 48,
    vramRequired: 30,
    quantization: 'Q4_K_M recommended, Q3_K_M for lower VRAM',
    useCase: 'Creative writing, roleplay, general tasks',
    pros: [
      'Mixture of Experts architecture (efficient)',
      'Creative and coherent outputs',
      'Good at following complex instructions',
      'Uncensored model variant available'
    ],
    cons: [
      'Large model size',
      'Requires significant VRAM',
      'Can be slower than dense models',
      'MoE architecture needs special support'
    ],
    downloadUrl: 'https://huggingface.co/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Yi 34B Chat',
    size: '20-68GB',
    params: '34B',
    ramRequired: 40,
    vramRequired: 24,
    quantization: 'Q4_K_M or Q5_K_M',
    useCase: 'Long context tasks, multilingual, analysis',
    pros: [
      'Excellent long context handling (200k)',
      'Strong multilingual capabilities',
      'Good reasoning for size',
      'Competitive with larger models'
    ],
    cons: [
      'Requires significant resources',
      'Less community content than Llama',
      'Can be slow on consumer hardware'
    ],
    downloadUrl: 'https://huggingface.co/01-ai/Yi-34B-Chat',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  },
  {
    name: 'Llama 3.1 8B Instruct',
    size: '4-16GB',
    params: '8B',
    ramRequired: 10,
    vramRequired: 6,
    quantization: 'Q4_K_M, Q5_K_M, or Q8_0',
    useCase: 'General purpose, balanced performance/speed',
    pros: [
      'Good balance of capability and speed',
      '128k context window',
      'Strong instruction following',
      'Wide framework support',
      'Can run on mid-range hardware'
    ],
    cons: [
      'Outperformed by newer models in its class',
      'Not as efficient as specialized smaller models',
      'May struggle with very complex reasoning'
    ],
    downloadUrl: 'https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct',
    framework: ['llama.cpp', 'Ollama', 'LM Studio', 'text-generation-webui'],
    requiresGPU: false
  }
];
