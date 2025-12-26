import { SystemSpecs } from './systemSpecs.js';
import { LLMModel, llmDatabase } from './llmDatabase.js';

interface RecommendedModel extends LLMModel {
  score: number;
  reasoning: string;
}

export function recommendModels(specs: SystemSpecs): RecommendedModel[] {
  const recommendations: RecommendedModel[] = [];

  for (const model of llmDatabase) {
    let score = 100;
    let reasoning = '';

    const ramAvailable = specs.memory.totalGB;
    const hasGPU = specs.gpu.hasGPU;
    const vramAvailable = hasGPU
      ? Math.max(...specs.gpu.controllers.map(g => g.vramGB))
      : 0;

    if (model.requiresGPU && !hasGPU) {
      continue;
    }

    if (model.ramRequired > ramAvailable) {
      continue;
    }

    if (model.vramRequired && hasGPU && model.vramRequired > vramAvailable) {
      continue;
    }

    const ramUtilization = (model.ramRequired / ramAvailable) * 100;

    if (ramUtilization > 90) {
      score -= 30;
      reasoning = 'High RAM usage - may cause system slowdown. ';
    } else if (ramUtilization > 75) {
      score -= 15;
      reasoning = 'Significant RAM usage - close other apps for best performance. ';
    } else if (ramUtilization < 25) {
      score += 10;
      reasoning = 'Low RAM usage - will run very smoothly. ';
    } else if (ramUtilization < 50) {
      score += 5;
      reasoning = 'Good RAM efficiency. ';
    }

    if (hasGPU && model.vramRequired) {
      const vramUtilization = (model.vramRequired / vramAvailable) * 100;

      if (vramUtilization > 90) {
        score -= 20;
        reasoning += 'Near max VRAM usage. ';
      } else if (vramUtilization > 75) {
        score -= 10;
        reasoning += 'High VRAM usage. ';
      } else if (vramUtilization < 50) {
        score += 15;
        reasoning += 'Excellent GPU fit - fast inference expected. ';
      } else {
        score += 5;
        reasoning += 'Good GPU fit. ';
      }
    } else if (!hasGPU) {
      if (parseInt(model.params) <= 7) {
        score += 10;
        reasoning += 'CPU-friendly size. ';
      } else if (parseInt(model.params) <= 13) {
        score -= 5;
        reasoning += 'CPU inference will be slower. ';
      } else {
        score -= 15;
        reasoning += 'CPU inference will be very slow - consider GPU. ';
      }
    }

    if (specs.memory.totalGB >= 64 && parseInt(model.params) >= 30) {
      score += 10;
      reasoning += 'Your high RAM enables larger, more capable models. ';
    }

    if (hasGPU && vramAvailable >= 24 && parseInt(model.params) >= 30) {
      score += 10;
      reasoning += 'Your GPU can handle high-end models. ';
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
