export interface Email {
  id: string;
  subject: string;
  from: string;
  to: string[];
  date: string;
  body: string;
  folder: string;
  account: string;
  category?: string;
}

