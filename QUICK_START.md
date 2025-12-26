# Quick Start Guide

## Installation

```bash
npm install
```

## Running the App

### GUI Application (Recommended)
```bash
npm run electron:dev
```

This will:
1. Start Vite development server
2. Build Electron main and preload scripts
3. Open the GUI application automatically

### CLI Application
```bash
npm run cli
```

This runs the command-line interface version with colored terminal output.

## What You'll See

### GUI Interface

The app will open in a desktop window showing:

1. **System Specifications Card**
   - Your CPU details (brand, cores, speed)
   - Total RAM
   - GPU information with VRAM (if available)
   - Operating system

2. **Recommended Models Grid**
   - Cards showing LLM recommendations ranked by compatibility
   - Each card displays:
     - Model rank and score (out of 100)
     - Model name and primary use case
     - Parameters and size range
     - RAM/VRAM requirements
     - Reasoning for the recommendation
     - Quantization suggestions

3. **Interactive Features**
   - Click any model card to expand it
   - Expanded view shows:
     - ✓ Pros (green)
     - ✗ Cons (red)
     - Supported frameworks (Ollama, LM Studio, etc.)
     - Download button to HuggingFace

4. **Information Cards**
   - Quantization guide
   - Getting started tips
   - Privacy/local execution assurance

## Building for Production

To create a distributable app:

```bash
npm run electron:build
```

This will create installers in the `release/` directory:
- Windows: NSIS installer (.exe)
- macOS: DMG file
- Linux: AppImage

## Troubleshooting

### "Cannot find module 'chalk'"
Run: `npm install`

### "electronAPI is not available"
Make sure you're running via `npm run electron:dev`, not opening index.html directly in a browser.

### Electron cache errors (harmless)
The errors like "Unable to move the cache" and "Autofill.enable failed" are harmless Electron warnings that don't affect functionality.

### Port 5173 already in use
Stop any running Vite/Electron processes and try again.

## Features

- **100% Local**: All models run entirely on your machine
- **Smart Recommendations**: Scores models based on your specific hardware
- **Up-to-date Database**: Includes latest models like Llama 3.3, Qwen 2.5, Phi-4, DeepSeek-R1
- **Multiple Interfaces**: Both GUI and CLI available
- **Cross-platform**: Works on Windows, macOS, and Linux
