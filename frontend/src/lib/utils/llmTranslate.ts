export async function llmTranslateJSON(
  content: any,
  targetLang: string
) {
  if (targetLang === "en") return content;

  const prompt = `
You are a professional agricultural translator.

Translate the following JSON content to language code "${targetLang}".

Rules:
- Preserve JSON structure exactly
- Translate ONLY string values
- Do NOT add or remove keys
- Do NOT explain
- Return ONLY valid JSON

JSON:
${JSON.stringify(content, null, 2)}
`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyBCmFh7bC59u62MEUIJR7HAmQhOIcb7ekE",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Translation failed");

  return JSON.parse(text);
}
