import { useState } from 'react';

interface RecommendedModel {
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
  score: number;
  reasoning: string;
}

interface Props {
  recommendations: RecommendedModel[];
}

function Recommendations({ recommendations }: Props) {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-yellow-500 to-amber-600';
    return 'from-blue-500 to-cyan-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Recommended Models</h2>
        <span className="ml-auto px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
          {recommendations.length} models found
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((model, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
              selectedModel === index ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedModel(selectedModel === index ? null : index)}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${getScoreColor(model.score)} p-6`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded">
                      #{index + 1}
                    </span>
                    <span className={`px-3 py-1 border rounded-full text-sm font-bold ${getScoreBadgeColor(model.score)}`}>
                      {model.score}/100
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{model.name}</h3>
                  <p className="text-white/80 text-sm">{model.useCase}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                  <p className="text-slate-400 text-xs mb-1">Parameters</p>
                  <p className="text-white font-bold text-lg">{model.params}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                  <p className="text-slate-400 text-xs mb-1">Size Range</p>
                  <p className="text-white font-bold text-lg">{model.size}</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">RAM Required:</span>
                  <span className="text-white font-semibold">{model.ramRequired} GB</span>
                </div>
                {model.vramRequired && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">VRAM Required:</span>
                    <span className="text-purple-400 font-semibold">{model.vramRequired} GB</span>
                  </div>
                )}
              </div>

              {/* Why this model */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm leading-relaxed">
                  <span className="font-semibold">Why this model: </span>
                  {model.reasoning}
                </p>
              </div>

              {/* Quantization */}
              {model.quantization && (
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                  <p className="text-slate-400 text-xs mb-1">Recommended Quantization</p>
                  <p className="text-purple-300 text-sm font-medium">{model.quantization}</p>
                </div>
              )}

              {/* Expandable Section */}
              {selectedModel === index && (
                <div className="space-y-4 animate-fade-in pt-4 border-t border-slate-700/50">
                  {/* Pros */}
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {model.pros.map((pro, idx) => (
                        <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Cons
                    </h4>
                    <ul className="space-y-2">
                      {model.cons.map((con, idx) => (
                        <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-red-400 mt-1">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Frameworks */}
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Supported Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.framework.map((fw, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                        >
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  {model.downloadUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(model.downloadUrl, '_blank');
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download from HuggingFace
                    </button>
                  )}
                </div>
              )}

              {/* Click to expand hint */}
              {selectedModel !== index && (
                <div className="text-center pt-2">
                  <p className="text-slate-500 text-xs">Click to see more details</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Quantization Guide</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Q4_K_M is recommended for most users, balancing quality and resource usage. Higher quantizations (Q5_K, Q8) offer better quality but need more resources.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Getting Started</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            We recommend Ollama for beginners (easiest setup) or LM Studio for a GUI experience. Both support all listed models.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">100% Local</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            All recommended models run completely offline on your machine. Your data stays private and secure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
