"use client";

import { useState } from "react";

type FormData = {
  game: "",
  currentRank: "",
  goalRank: "",
  painPoints: "Mechanics",
  hoursPerWeek: "1-3 hours",
  practiceStyle: "Structured drills"
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
  game: "",
  currentRank: "",
  goalRank: "",
  painPoints: "Mechanics",
  hoursPerWeek: "1-3 hours",
  practiceStyle: "Structured drills"
});
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, systemPrompt: "Generate a personalized training plan including: 4-8 week training plan, daily/weekly practice routine, specific drills per week, VOD self-review checklist, mental game techniques, when to rank vs. when to practice, and recommended educational content to watch." }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data.result || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className={"text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"}>
            "AI Gaming Coach & Performance Analyzer"
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Fill in the options below and generate your game content instantly.</p>
        </header>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="space-y-4">
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Game Title</label><input type="text" name="game" value={formData.game} onChange={handleChange} placeholder="e.g. Valorant, League of Legends, Chess.com" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-200" /></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Current Rank / Division</label><input type="text" name="currentRank" value={formData.currentRank} onChange={handleChange} placeholder="e.g. Gold 2, 1200 ELO, Diamond 3" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-200" /></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Goal Rank</label><input type="text" name="goalRank" value={formData.goalRank} onChange={handleChange} placeholder="e.g. Platinum, 1500 ELO, Immortal" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-200" /></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Main Pain Points</label><select name="painPoints" value={formData.painPoints} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-200">{['Mechanics','Game Sense','Positioning','Mental Game','Decision Making','All of the above'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Hours Available per Week</label><select name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-200">{['1-3 hours','3-6 hours','6-10 hours','10+ hours'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Preferred Practice Style</label><select name="practiceStyle" value={formData.practiceStyle} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-200">{['Structured drills','Free play','VOD review','Watching tutorials','Mix of everything'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className={"w-full bg-amber-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"}
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </button>
              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 rounded-lg p-2">{error}</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-3">
            {result ? (
              <div className={"bg-amber-500/10 border border-zinc-800 rounded-2xl p-5"}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={"font-semibold text-amber-400"}>Generated Result</h2>
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded bg-zinc-800"
                  >
                    Copy
                  </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-2xl p-12 min-h-96">
                <span className="text-4xl mb-4">&#127918;</span>
                <p className="text-center text-sm">Your generated game content will appear here.</p>
                <p className="text-center text-xs text-zinc-700 mt-2">Fill out the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
