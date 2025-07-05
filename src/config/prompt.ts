export const PROMPT = `
Analyse the email provided below and extract the following information.

1. **Summarise** the main content of the email in your own words (exclude salutations, signatures, and boilerplate text).
2. Return your findings in the JSON structure shown, filling in as many fields as possible.  
   • If a field is not present, set its value to null.  
   • If multiple dates/locations are mentioned, choose the most relevant or include a brief note in "details".  
   • Add any extra event‑specific fields you identify (e.g., dress code, agenda) inside "details".
   - Also make sure to avoid response like this <a href="http://www.sachetnepal.com/codequest2025">www.sachetnepal.com/codequest2025</a> just the link www.sachetnepal.com/codequest2025

Respond in **exactly** the following JSON format—no additional keys, comments, or free‑text outside the JSON block:

{
  "title": "<short summary of the main topic as a relevant title>",
  "date": "<YYYY-MM-DD>",
  "content": "<concise summary of the main body>",
  "author": "<sender name or email>",
  "category": "<general category, e.g. science, arts, history>",
  "tags": ["<tag1>", "<tag2>", "..."],
  "published_for": "<intended audience, e.g. Grade 12 students>",
  "details": {
    "location": "<event location>",
    "prize_pool": "<prize pool>",
    "deadline": "<registration or event deadline>",
    "organizer": "<organizer>",
    "link": "<relevant URL>",
    "<additional_field>": "<additional detail>"
  }
}

Ensure the "date" field is in ISO format (YYYY-MM-DD). If no event‑related information is found, return "details": {}.
`;
