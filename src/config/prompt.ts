export const PROMPT = `
Analyse the provided email and extract the following information: the date the email was sent, the main content of the email (excluding salutations, signatures, or boilerplate text), the author (sender's name or email address), and any relevant event details such as location, prize pool, deadline, organizer, link, and any additional details you identify as pertinent. Return the response in the following JSON format:

{
  "date": "<date the email was sent, formatted as YYYY-MM-DD>",
  "content": "<main body of the email, excluding salutations and signatures>",
  "author": "<sender's name or email address>",
  "category": "<the general cateogory of the notice like science, history arts, etc )>",
  "tags": ["<List of tags associated with the notice>"],
  "published_for": "< the group of people this notice maybe for for eg Grade 12 students, general highschoolers>",
  "details": {
    "location": "<event location, if applicable>",
    "prize_pool": "<prize pool, if applicable>",
    "deadline": "<event or registration deadline, if applicable>",
    "organizer": "<event organizer, if applicable>",
    "link": "<event link, if applicable>",
    "<additional_field>": "<additional relevant detail, if identified>"
  }
}

Ensure the date is formatted as YYYY-MM-DD. If any details are not present in the email, include the corresponding field with a null value. Add any additional relevant details to the "details" object with appropriate field names based on the email content. If no event-related details are found, return an empty "details" object. Handle edge cases, such as ambiguous dates or multiple events, by selecting the most relevant information or noting ambiguities in the "details" object.
`;