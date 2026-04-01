import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { game, focus, skillLevel } = await req.json();
    const prompt = `You are an elite esports coach. Provide a comprehensive coaching plan for:
- **Game:** ${game}
- **Focus Area:** ${focus}
- **Current Skill Level:** ${skillLevel}

Include: 1) Assessment of Key Weaknesses, 2) Daily/Weekly Practice Routine, 3) Fundamental Drills & Exercises, 4) Advanced Techniques to Master, 5) Mental Game & Mindset Tips, 6) VOD Review Checklist, 7) Resource Recommendations (guides, streamers, tools). Be specific and actionable.`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [
        { role: "system", content: "You are a professional esports coach with expertise in multiple competitive games." },
        { role: "user", content: prompt }
      ], temperature: 0.8, max_tokens: 2000 }),
    });
    if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No response." });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
