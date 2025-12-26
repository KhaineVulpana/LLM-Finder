function Header() {
  return (
    <header className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/80 drag-region">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg
              className="w-7 h-7 text-white"
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
          <div>
            <h1 className="text-3xl font-bold gradient-text-blue">LLM Finder</h1>
            <p className="text-slate-400 text-sm">Discover the perfect local AI for your hardware</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
