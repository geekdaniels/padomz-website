var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN,
});

export const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE); 