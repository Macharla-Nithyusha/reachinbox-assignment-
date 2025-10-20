import React, { useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import EmailDetail from "../components/EmailDetail";
import { getEmails } from "../services/api";

export default function EmailView() {
  const [emails, setEmails] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    getEmails().then(setEmails);
  }, []);

  const onSelect = (email: any) => {
    setSelected(email);
  };

  const onCategoryUpdated = (newCat: string) => {
    if (selected) setSelected({ ...selected, category: newCat });
    setEmails(prev => prev.map(e => (e.id === selected?.id ? { ...e, category: newCat } : e)));
  };

  return (
    <div className="email-view">
      <div className="email-list-column">
        <EmailList emails={emails} onSelect={onSelect} />
      </div>
      <div className="email-detail-column">
        {selected ? <EmailDetail email={selected} onCategoryUpdated={onCategoryUpdated} /> : <div>Select an email</div>}
      </div>
    </div>
  );
}

