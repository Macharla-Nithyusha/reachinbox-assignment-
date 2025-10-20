import React, { useState } from "react";

type Email = {
  id: string;
  subject: string;
  from: string;
  to?: string | string[];
  date?: string;
  body?: string;
  account?: string;
  folder?: string;
  category?: string;
};

type Props = {
  email: Email;
  onCategoryUpdated?: (newCategory: string) => void;
};

export default function EmailDetail({ email, onCategoryUpdated }: Props) {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const suggestReply = async () => {
    setLoading(true);
    setSuggestion(null);
    try {
      const res = await fetch("http://localhost:3000/suggest-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailBody: email.body || "",
          context: "If lead is interested, share the meeting link: https://cal.com/example",
        }),
      });
      const json = await res.json();
      setSuggestion(json.reply || json.suggestedReply || json.suggestion || JSON.stringify(json));
    } catch (err) {
      setSuggestion("Failed to get suggestion.");
    } finally {
      setLoading(false);
    }
  };

  const reCategorize = async () => {
    try {
      const res = await fetch(`http://localhost:3000/emails/${email.id}/categorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: email.body || "" }),
      });
      const json = await res.json();
      if (onCategoryUpdated) onCategoryUpdated(json.category || json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="email-detail">
      <h2 className="detail-subject">{email.subject}</h2>
      <div className="detail-meta">
        <div><strong>From:</strong> {email.from}</div>
        <div><strong>To:</strong> {Array.isArray(email.to) ? (email.to.join(", ")) : (email.to || "")}</div>
        <div><strong>Date:</strong> {email.date ? new Date(email.date).toLocaleString() : ""}</div>
        <div><strong>Account:</strong> {email.account || "-"}</div>
        <div><strong>Folder:</strong> {email.folder || "-"}</div>
        <div><strong>Category:</strong> {email.category || "Uncategorized"}</div>
      </div>

      <div className="detail-body">
        <pre>{email.body || "(no body)"}</pre>
      </div>

      <div className="detail-actions">
        <button onClick={reCategorize}>Re-run Categorize</button>
        <button onClick={suggestReply} disabled={loading}>
          {loading ? "Generating..." : "Suggest Reply"}
        </button>
      </div>

      {suggestion && (
        <div className="suggestion">
          <h3>Suggested Reply</h3>
          <div className="suggestion-text">{suggestion}</div>
        </div>
      )}
    </div>
  );
}

