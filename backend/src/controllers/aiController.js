const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

exports.getSuggestions = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ error: 'resumeText required' });

    const prompt = `You are a helpful resume advisor. Given the following resume content, provide:
1) Short Title: 2-3 words
2) Top 5 bullet suggestions to improve clarity, impact, and keywords for tech roles.
3) 8 keyword suggestions (comma-separated).
4) One-line improved summary (if present).
Resume content:
${resumeText}
Respond in JSON with fields: title, suggestions (array), keywords (array), improvedSummary (string).`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 400
    });

    const reply = completion.data.choices[0].message.content;
    let parsed;
    try { parsed = JSON.parse(reply); } catch { parsed = { raw: reply }; }
    res.json({ ai: parsed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};