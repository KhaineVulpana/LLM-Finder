#!/usr/bin/env node

import { getSystemSpecs, displaySpecs } from './systemSpecs.js';
import { recommendModels } from './recommender.js';
import { displayRecommendations } from './display.js';
import chalk from 'chalk';

async function main() {
  try {
    console.log(chalk.bold.magenta('\n🔍 LLM Finder - Find the Best Local LLMs for Your Hardware\n'));

    console.log(chalk.cyan('Detecting your system specifications...\n'));

    const specs = await getSystemSpecs();

    displaySpecs(specs);

    console.log(chalk.cyan('Analyzing compatible models...\n'));

    const recommendations = recommendModels(specs);

    displayRecommendations(recommendations);

  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
