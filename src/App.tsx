import { useState, useEffect } from 'react';
import SystemSpecs from './components/SystemSpecs';
import Recommendations from './components/Recommendations';
import Header from './components/Header';
import Loading from './components/Loading';
import { SystemSpecs as SystemSpecsType } from './systemSpecs';

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

function App() {
  const [specs, setSpecs] = useState<SystemSpecsType | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.electronAPI) {
        throw new Error('Electron API not available. Please ensure the app is running in Electron.');
      }

      const specsResult = await window.electronAPI.getSystemSpecs();
      if (!specsResult.success) {
        throw new Error(specsResult.error);
      }

      setSpecs(specsResult.data);

      const recsResult = await window.electronAPI.getRecommendations(specsResult.data);
      if (!recsResult.success) {
        throw new Error(recsResult.error);
      }

      setRecommendations(recsResult.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={loadData}
            className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="container mx-auto px-6 py-8 pb-16">
        {specs && <SystemSpecs specs={specs} />}
        {recommendations.length > 0 && <Recommendations recommendations={recommendations} />}
      </main>
    </div>
  );
}

export default App;
