import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { esClient } from "../config/elasticsearch";
import { IMAP_ACCOUNTS } from "../config/imapConfig";
import { categorizeEmail } from "./categorizer";
import { sendNotification } from "./notify";

export const startIMAPSync = async () => {
  for (const account of IMAP_ACCOUNTS) {
    const client = new ImapFlow({
      host: "imap.gmail.com",
      port: 993,
      secure: true,
      auth: { user: account.user, pass: account.pass },
    });

    await client.connect();
    await client.mailboxOpen("INBOX");

    client.on("exists", async () => {
      for await (let msg of client.fetch("1:*", { envelope: true, source: true })) {
        const parsed = await simpleParser(msg.source);
        const email = {
          id: msg.uid.toString(),
          subject: parsed.subject || "",
          from: parsed.from?.text || "",
          to: parsed.to?.value.map((v) => v.address) || [],
          date: parsed.date?.toISOString() || "",
          body: parsed.text || "",
          folder: "INBOX",
          account: account.user,
        };
        await esClient.index({ index: "emails", id: email.id, document: email });
        const category = await categorizeEmail(email.body);
        if (category === "Interested") sendNotification(email);
      }
    });
  }
};

