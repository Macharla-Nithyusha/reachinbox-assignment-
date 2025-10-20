import express from "express";
import dotenv from "dotenv";
import emailRoutes from "./routes/emailRoutes";
import replyRoutes from "./routes/replyRoutes";
import { startIMAPSync } from "./services/imapSync";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/emails", emailRoutes);
app.use("/suggest-reply", replyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  startIMAPSync();
});

