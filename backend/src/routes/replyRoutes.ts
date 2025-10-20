import express from "express";
import { suggestReply } from "../services/ragService";
const router = express.Router();

router.post("/", async (req, res) => {
  const { emailBody } = req.body;
  const reply = await suggestReply(emailBody);
  res.json({ suggestedReply: reply });
});

export default router;

