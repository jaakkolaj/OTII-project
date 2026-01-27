import { openai } from "../config/openai";

export async function analyzeTextWithAI(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an assistant that evaluates CV content."
      },
      {
        role: "user",
        content: `
Analyze the following CV text and return a JSON object with:
- skills_score (0-1)
- experience_score (0-1)
- education_score (0-1)
- structure_score (0-1)
- short_comment

CV TEXT:
${text}
        `
      }
    ],
    temperature: 0.2
  });

  return response.choices[0].message.content;
}
