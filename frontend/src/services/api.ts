const BASE_URL = "http://localhost:3000";

export async function getEmails(query?: string) {
  const url = query ? `${BASE_URL}/emails?query=${encodeURIComponent(query)}` : `${BASE_URL}/emails`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function categorizeEmail(emailId: string, body: string) {
  const res = await fetch(`${BASE_URL}/emails/${emailId}/categorize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  });
  return res.json();
}
