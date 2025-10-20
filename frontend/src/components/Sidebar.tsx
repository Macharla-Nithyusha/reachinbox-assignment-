import React from "react";

type Props = {
  onSelectFolder?: (folder: string) => void;
  onSelectAccount?: (account: string) => void;
};

export default function Sidebar({ onSelectAccount, onSelectFolder }: Props) {
  // static for demo — you can extend to fetch accounts/folders from backend
  const accounts = ["Account1", "Account2"];
  const folders = ["INBOX", "Sent", "Spam"];

  return (
    <aside className="sidebar">
      <div className="logo">ReachInbox</div>

      <div className="sidebar-section">
        <h4>Accounts</h4>
        <ul>
          {accounts.map(a => (
            <li key={a} onClick={() => onSelectAccount?.(a)}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>Folders</h4>
        <ul>
          {folders.map(f => (
            <li key={f} onClick={() => onSelectFolder?.(f)}>{f}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

