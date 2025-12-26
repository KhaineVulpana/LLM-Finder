import { SystemSpecs as SystemSpecsType } from '../systemSpecs';

interface Props {
  specs: SystemSpecsType;
}

function SystemSpecs({ specs }: Props) {
  return (
    <div className="mb-12 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">System Specifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPU */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-white">Processor</h3>
            </div>
            <p className="text-slate-300 font-medium mb-2">{specs.cpu.brand}</p>
            <div className="flex gap-4 text-sm">
              <span className="text-slate-400">
                {specs.cpu.physicalCores} cores / {specs.cpu.cores} threads
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-400">{specs.cpu.speed} GHz</span>
            </div>
          </div>

          {/* RAM */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-white">Memory</h3>
            </div>
            <p className="text-slate-300 font-medium text-2xl">{specs.memory.totalGB} GB</p>
            <p className="text-slate-400 text-sm mt-1">System RAM</p>
          </div>

          {/* GPU */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-white">Graphics</h3>
            </div>
            {specs.gpu.hasGPU ? (
              <div className="space-y-3">
                {specs.gpu.controllers.map((gpu, idx) => (
                  gpu.vram > 0 && (
                    <div key={idx} className="flex items-center justify-between">
                      <p className="text-slate-300 font-medium">{gpu.model}</p>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                        {gpu.vramGB} GB VRAM
                      </span>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No dedicated GPU detected (CPU only)</p>
            )}
          </div>

          {/* Platform */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30 md:col-span-2">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-white">Platform</h3>
              <span className="ml-auto px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm font-medium capitalize">
                {specs.platform}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemSpecs;
