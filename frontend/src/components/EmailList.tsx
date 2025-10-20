import React from "react";

export default function EmailList({ emails }: any) {
  return (
    <div>
      {emails.map((e: any) => (
        <div key={e.id} className="p-2 border-b">
          <strong>{e.subject}</strong> — {e.from}
          <p>{e.category || "Uncategorized"}</p>
        </div>
      ))}
    </div>
  );
}

