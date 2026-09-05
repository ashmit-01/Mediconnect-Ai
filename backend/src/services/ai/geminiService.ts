import { env } from "../../config/env.js";

const DISCLAIMER =
  "This information is for general guidance only and is not a medical diagnosis. Consult a qualified healthcare professional for diagnosis or treatment.";

type GeminiCandidate = {
  content?: { parts?: Array<{ text?: string }> };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

export async function analyzeSymptoms(symptoms: string) {
  if (!env.geminiApiKey) {
    return {
      guidance: "AI service is not configured. Please consult a qualified healthcare professional for medical advice.",
      suggestedSpecialty: null,
      disclaimer: DISCLAIMER
    };
  }

  const prompt = [
    "You are a healthcare information assistant.",
    "Do not diagnose diseases and do not claim certainty.",
    "Given the user's symptoms, provide concise general informational guidance.",
    "Suggest one medical specialty only when reasonably appropriate.",
    "Do not prescribe medication or dosage.",
    `User symptoms: ${symptoms}`,
    `Always include this disclaimer: ${DISCLAIMER}`
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    }
  );

  if (!response.ok) {
    throw new Error("Gemini request failed");
  }

  const data = (await response.json()) as GeminiResponse;
  const text =
    data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") ||
    "No AI guidance was returned.";

  return {
    guidance: text,
    suggestedSpecialty: null,
    disclaimer: DISCLAIMER
  };
}
