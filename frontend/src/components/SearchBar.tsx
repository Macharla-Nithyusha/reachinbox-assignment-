import React, { useState } from "react";

type Props = {
  onSearch: (q: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [q, setQ] = useState("");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(q);
  };

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        placeholder="Search subject, sender, body..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

