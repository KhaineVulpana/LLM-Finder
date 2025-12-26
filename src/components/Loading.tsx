function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your System</h2>
        <p className="text-slate-400">Detecting hardware specifications...</p>
      </div>
    </div>
  );
}

export default Loading;
