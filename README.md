# LLM Finder

Find the best local LLMs for your hardware configuration!

## What it does

LLM Finder automatically:
- 🖥️ Detects your system specifications (CPU, RAM, GPU/VRAM)
- 🤖 Analyzes a curated database of popular local LLMs
- 🎯 Recommends 5-10 models optimized for your hardware
- 📊 Provides detailed information including pros, cons, quantization options, and download links

## Features

- **Modern GUI**: Beautiful, sleek Electron-based interface with dark mode
- **Hardware Detection**: Automatically scans CPU, RAM, and GPU capabilities
- **Smart Recommendations**: Scores models based on compatibility with your system
- **Interactive Cards**: Click to expand and see detailed pros/cons for each model
- **Detailed Information**: Each recommendation includes:
  - Model parameters and size
  - RAM/VRAM requirements
  - Quantization recommendations
  - Pros and cons
  - Use cases
  - Supported frameworks (Ollama, LM Studio, llama.cpp, etc.)
  - Direct download links to HuggingFace
- **CLI Option**: Also includes a command-line interface for terminal users

## Installation

```bash
npm install
```

## Usage

### GUI Application (Recommended):
```bash
npm run electron:dev
```

To build the GUI for distribution:
```bash
npm run electron:build
```

### Command Line Interface:
```bash
npm run cli
```

## How it works

1. **System Detection**: Uses `systeminformation` library to detect your hardware
2. **Model Analysis**: Compares your specs against a curated database of local LLMs
3. **Scoring Algorithm**: Ranks models based on:
   - RAM/VRAM compatibility
   - Performance expectations
   - Hardware utilization efficiency
4. **Recommendations**: Displays top 5-10 models with comprehensive details

## Supported Models

The database includes popular models like:
- Llama 3.3 70B, Llama 3.1 8B, Llama 3.2 3B
- Qwen 2.5 32B
- Mistral 7B
- Phi-4
- DeepSeek-R1
- Gemma 2 9B
- Nous Hermes 2 Mixtral 8x7B
- Yi 34B Chat
- And more!

## Requirements

- Node.js 18 or higher
- Windows, macOS, or Linux

## Understanding Quantization

Models are available in different quantization levels:
- **Q2_K**: Smallest, lowest quality (emergency option)
- **Q3_K**: Small size, acceptable quality
- **Q4_K**: Recommended balance (most popular)
- **Q5_K**: Better quality, larger size
- **Q8_0**: High quality, requires more resources

## Recommended Tools for Running Local LLMs

- **Ollama**: Easiest setup, CLI-based
- **LM Studio**: User-friendly GUI
- **llama.cpp**: Maximum flexibility
- **text-generation-webui**: Feature-rich web interface

## License

MIT
