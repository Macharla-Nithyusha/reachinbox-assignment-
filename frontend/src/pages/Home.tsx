import React, { useState, useEffect } from "react";
import { getEmails } from "../services/api";
import EmailList from "../components/EmailList";

export default function Home() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    getEmails().then(setEmails);
  }, []);

  return <EmailList emails={emails} />;
}

