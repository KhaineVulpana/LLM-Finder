import si from 'systeminformation';

export interface SystemSpecs {
  cpu: {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
    speed: number;
  };
  memory: {
    total: number;
    totalGB: number;
  };
  gpu: {
    controllers: Array<{
      model: string;
      vram: number;
      vramGB: number;
    }>;
    hasGPU: boolean;
  };
  platform: string;
}

export async function getSystemSpecs(): Promise<SystemSpecs> {
  const cpuPromise = si.cpu().catch(() => ({
    manufacturer: 'Unknown',
    brand: 'Unknown CPU',
    cores: 0,
    physicalCores: 0,
    speed: 0
  }));

  const memPromise = si.mem().catch(() => ({
    total: 0
  } as any));

  const graphicsPromise = si.graphics().catch(() => ({
    controllers: []
  } as any));

  const osInfoPromise = si.osInfo().catch(() => ({
    platform: process.platform
  } as any));

  const [cpu, mem, graphics, osInfo] = await Promise.all([
    cpuPromise,
    memPromise,
    graphicsPromise,
    osInfoPromise
  ]);

  const gpuControllers = (graphics.controllers || []).map(controller => ({
    model: controller.model || 'Unknown GPU',
    vram: controller.vram || 0,
    vramGB: Math.round((controller.vram || 0) / 1024)
  })).filter(gpu => gpu.vram > 0 || gpu.model !== 'Unknown GPU');

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
      totalGB: Math.round((mem.total || 0) / (1024 ** 3))
    },
    gpu: {
      controllers: gpuControllers,
      hasGPU: gpuControllers.length > 0 && gpuControllers.some(g => g.vram > 0)
    },
    platform: osInfo.platform
  };
}

export function displaySpecs(specs: SystemSpecs): void {
  console.log('\n=== System Specifications ===\n');
  console.log(`CPU: ${specs.cpu.brand}`);
  console.log(`Cores: ${specs.cpu.physicalCores} physical / ${specs.cpu.cores} logical`);
  console.log(`CPU Speed: ${specs.cpu.speed} GHz`);
  console.log(`RAM: ${specs.memory.totalGB} GB`);

  if (specs.gpu.hasGPU) {
    console.log('\nGPU(s):');
    specs.gpu.controllers.forEach((gpu, idx) => {
      if (gpu.vram > 0) {
        console.log(`  ${idx + 1}. ${gpu.model} (${gpu.vramGB} GB VRAM)`);
      }
    });
  } else {
    console.log('\nGPU: No dedicated GPU detected (CPU only)');
  }

  console.log(`Platform: ${specs.platform}\n`);
}
