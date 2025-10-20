import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();

export const esClient = new Client({ node: process.env.ES_URL || "http://localhost:9200" });

