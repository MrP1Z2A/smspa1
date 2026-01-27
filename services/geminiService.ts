
import { GoogleGenAI } from "@google/genai";
import { GradeResult } from "../types";

export const getAcademicInsights = async (grades: GradeResult[], studentName: string) => {
  // Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per coding guidelines.
  // The API key is assumed to be pre-configured and accessible in the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Analyze the following grades for a student named ${studentName} and provide a 3-sentence summary for the parent. Highlight strengths and one area for improvement.
  
  Grades: ${JSON.stringify(grades)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional academic advisor helping a parent understand their child's performance.",
        temperature: 0.7,
      }
    });
    // Fix: Directly access the .text property on the GenerateContentResponse object.
    return response.text || "Insight unavailable at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI advisor is currently offline. Please check back later.";
  }
};
