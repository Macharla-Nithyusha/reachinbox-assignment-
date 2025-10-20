import { openai } from "../config/aiClient";

export async function suggestReply(emailBody: string): Promise<string> {
  const prompt = `
You are a helpful assistant suggesting email replies.
Email received: "${emailBody}"
Training data: "If lead is interested, share meeting link: https://cal.com/example"
Reply:`;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return response.output_text.trim();
}

