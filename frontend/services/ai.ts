import { apiFetch } from "./api";

export type AIResponse = {
  guidance: string;
  suggestedSpecialty: string | null;
  disclaimer: string;
};

export function askSymptoms(symptoms: string) {
  return apiFetch<AIResponse>("/ai/symptoms", {
    method: "POST",
    body: JSON.stringify({ symptoms })
  });
}
