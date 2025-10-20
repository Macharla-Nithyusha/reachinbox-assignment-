import { esClient } from "../config/elasticsearch";

export async function searchEmails(query: string) {
  const { hits } = await esClient.search({
    index: "emails",
    query: { multi_match: { query, fields: ["subject", "body", "from"] } },
  });
  return hits.hits.map((h) => h._source);
}

