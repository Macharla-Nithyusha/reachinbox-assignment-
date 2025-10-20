import express from "express";
import { searchEmails } from "../services/search";
import { categorizeEmail } from "../services/categorizer";
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query as string;
  const results = await searchEmails(query || "");
  res.json(results);
});

router.post("/:id/categorize", async (req, res) => {
  const { body } = req.body;
  const category = await categorizeEmail(body);
  res.json({ category });
});

export default router;

