import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getRaceSummary(raceData: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this F1 race data for a beginner. Explain what's happening in simple terms, focusing on the leader, key battles, and strategy. Use a storytelling tone. Data: ${JSON.stringify(raceData)}`,
      config: {
        systemInstruction: "You are an expert F1 commentator who specializes in explaining the sport to people who have never seen a race before. Keep it exciting but very simple.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating race summary:", error);
    return "Unable to generate summary at this moment.";
  }
}
