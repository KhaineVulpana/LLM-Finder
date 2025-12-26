import chalk from 'chalk';
import { LLMModel } from './llmDatabase.js';

interface RecommendedModel extends LLMModel {
  score: number;
  reasoning: string;
}

export function displayRecommendations(models: RecommendedModel[]): void {
  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║          RECOMMENDED LOCAL LLMs FOR YOUR HARDWARE                 ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════════╝\n'));

  if (models.length === 0) {
    console.log(chalk.red('No suitable models found for your hardware configuration.'));
    console.log(chalk.yellow('Consider upgrading your RAM or adding a GPU for better LLM support.\n'));
    return;
  }

  models.forEach((model, index) => {
    const rank = index + 1;
    const scoreColor = model.score >= 90 ? chalk.green : model.score >= 70 ? chalk.yellow : chalk.white;

    console.log(chalk.bold.white(`\n${rank}. ${model.name}`) + scoreColor(` [Score: ${model.score}/100]`));
    console.log(chalk.gray('─'.repeat(70)));

    console.log(chalk.white(`   Parameters: ${chalk.cyan(model.params)}`));
    console.log(chalk.white(`   Size Range: ${chalk.cyan(model.size)}`));
    console.log(chalk.white(`   RAM Required: ${chalk.cyan(model.ramRequired + ' GB')}`));

    if (model.vramRequired) {
      console.log(chalk.white(`   VRAM Required: ${chalk.cyan(model.vramRequired + ' GB')} (GPU recommended)`));
    }

    if (model.quantization) {
      console.log(chalk.white(`   Quantization: ${chalk.magenta(model.quantization)}`));
    }

    console.log(chalk.white(`   Use Case: ${chalk.yellow(model.useCase)}`));
    console.log(chalk.white(`   Frameworks: ${chalk.blue(model.framework.join(', '))}`));

    console.log(chalk.white('\n   ' + chalk.bold('Why this model:')));
    console.log(chalk.white(`   ${chalk.italic(model.reasoning)}`));

    console.log(chalk.white('\n   ' + chalk.bold.green('Pros:')));
    model.pros.forEach(pro => {
      console.log(chalk.green(`   ✓ ${pro}`));
    });

    console.log(chalk.white('\n   ' + chalk.bold.red('Cons:')));
    model.cons.forEach(con => {
      console.log(chalk.red(`   ✗ ${con}`));
    });

    if (model.downloadUrl) {
      console.log(chalk.white('\n   ' + chalk.bold('Download:')));
      console.log(chalk.blue(`   ${model.downloadUrl}`));
    }

    if (index < models.length - 1) {
      console.log('\n' + chalk.gray('═'.repeat(70)));
    }
  });

  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║                      ADDITIONAL INFORMATION                        ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.white('📊 ' + chalk.bold('Understanding Quantization:')));
  console.log(chalk.gray('   Quantization reduces model size and memory usage by using lower precision.'));
  console.log(chalk.gray('   • Q2_K: Smallest size, lowest quality (emergency low-VRAM option)'));
  console.log(chalk.gray('   • Q3_K: Small size, acceptable quality'));
  console.log(chalk.gray('   • Q4_K: Good balance of size and quality (recommended for most)'));
  console.log(chalk.gray('   • Q5_K: Better quality, larger size'));
  console.log(chalk.gray('   • Q8_0: High quality, large size (if you have the resources)\n'));

  console.log(chalk.white('🛠️  ' + chalk.bold('Recommended Tools:')));
  console.log(chalk.gray('   • Ollama: Easiest to use, one-command setup'));
  console.log(chalk.gray('   • LM Studio: User-friendly GUI, great for beginners'));
  console.log(chalk.gray('   • llama.cpp: Most flexible, command-line power'));
  console.log(chalk.gray('   • text-generation-webui: Feature-rich web interface\n'));

  console.log(chalk.white('💡 ' + chalk.bold('Getting Started:')));
  console.log(chalk.gray('   1. Choose a model from the list above'));
  console.log(chalk.gray('   2. Install Ollama (easiest) or LM Studio (GUI)'));
  console.log(chalk.gray('   3. Download the model in your preferred quantization'));
  console.log(chalk.gray('   4. Start chatting locally!\n'));

  console.log(chalk.green('✨ All models listed can run 100% locally on your machine!\n'));
}
