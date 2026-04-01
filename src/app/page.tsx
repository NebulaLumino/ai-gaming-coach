"use client";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState<Record<string, string>>({
      "game": "League of Legends",
      "focus": "Aim",
      "skillLevel": "Beginner",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        game: formData["game"],
        focus: formData["focus"],
        skillLevel: formData["skillLevel"],
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data.result);
    } catch { setError("Failed to generate content."); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
            🎮 AI Gaming Coach
          </h1>
          <p className="text-slate-400">Get personalized esports coaching and improvement plans</p>
        </header>

        <form onSubmit={handleGenerate} className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 mb-8 border border-amber-500/20 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-amber-300 mb-2">Game</label>
              <select value={formData["game"]} onChange={e => setFormData({...formData, "game": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                {Array.from({length: 10}).map((_, i) => <option key={i}>{["League of Legends", "Valorant", "CS2", "Dota 2", "Overwatch 2", "Fortnite", "Apex Legends", "Rocket League", "Street Fighter 6", "Tekken 8"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-300 mb-2">Focus Area</label>
              <select value={formData["focus"]} onChange={e => setFormData({...formData, "focus": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                {Array.from({length: 8}).map((_, i) => <option key={i}>{["Aim", "Game Sense", "Positioning", "Decision Making", "Mechanics", "Mental Game", "Communication", "All-Around"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-300 mb-2">Skill Level</label>
              <select value={formData["skillLevel"]} onChange={e => setFormData({...formData, "skillLevel": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                {Array.from({length: 5}).map((_, i) => <option key={i}>{["Beginner", "Intermediate", "Advanced", "Competitive", "Pro"]}[i]</option>)}
              </select>
            </div>          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-xl font-semibold text-white transition-all disabled:opacity-50">
            {loading ? "Generating..." : "🎮 Generate"}
          </button>
        </form>

        {error && <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-4 text-red-300 mb-6">{error}</div>}

        {result && (
          <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 border border-amber-500/20">
            <h2 className="text-xl font-bold text-amber-300 mb-4">Generated Content</h2>
            <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}
