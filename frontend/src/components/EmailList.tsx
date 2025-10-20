import React from "react";

type Email = {
  id: string;
  subject: string;
  from: string;
  date?: string;
  category?: string;
};

type Props = {
  emails: Email[];
  onSelect?: (email: Email) => void;
};

export default function EmailList({ emails, onSelect }: Props) {
  if (!emails || emails.length === 0) return <div className="email-list-empty">No emails</div>;

  return (
    <div className="email-list">
      {emails.map((e) => (
        <div
          key={e.id}
          className="email-item"
          onClick={() => onSelect && onSelect(e)}
          role="button"
          tabIndex={0}
        >
          <div className="email-subject">{e.subject || "(no subject)"}</div>
          <div className="email-meta">
            <span className="email-from">{e.from}</span>
            <span className="email-date">{e.date ? new Date(e.date).toLocaleString() : ""}</span>
          </div>
          <div className="email-category">{e.category || "Uncategorized"}</div>
        </div>
      ))}
    </div>
  );
}
