
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function sendNotification(email: any) {
  await axios.post(process.env.SLACK_WEBHOOK_URL!, {
    text: `📩 Interested email from: ${email.from}\nSubject: ${email.subject}`,
  });

  await axios.post(process.env.EXTERNAL_WEBHOOK_URL!, {
    email,
    event: "Interested",
  });
}
