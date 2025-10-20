import { openai } from "../config/aiClient";

export async function categorizeEmail(content: string): Promise<string> {
  const prompt = `
  Categorize the email into one of:
  [Interested, Meeting Booked, Not Interested, Spam, Out of Office].
  Email:
  ${content}
  `;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = response.output_text.trim();
  return text || "Uncategorized";
}

