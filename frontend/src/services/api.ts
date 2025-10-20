import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getEmails = async () => {
  const res = await axios.get(`${BASE_URL}/emails`);
  return res.data;
};

