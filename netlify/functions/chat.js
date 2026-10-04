// Serverless proxy: the API key stays on the server (Netlify environment variable ANTHROPIC_API_KEY).
// Never put the key in any file of this project. Set GEMINI_API_KEY (free tier) OR ANTHROPIC_API_KEY (paid).
const FAQ = require('./faq.js');
const SYSTEM = `You are the helper chatbot on "Diabetes Awareness & Risk Assessment", a Class 12 CBSE Artificial Intelligence school project built by Rishabh Mourya's team (Avikshit Garg: Head of Project, Sunny: Video Editor, Mudit: Process Documentation Lead, Arjun Goswami: Cookbook compilation).
RULES
- Answer simply, at Class 12 level, in at most 120 words. Plain text only, no markdown. Reply in the language the user writes in (English or Hindi).
- Educational only. NEVER diagnose, never say a person has or does not have diabetes, never advise on medicines, insulin doses or treatment. Tell them to consult a qualified doctor.
- If the user describes an emergency (fainting, confusion, vomiting, trouble breathing, chest pain) tell them to get urgent medical help now. If they mention self-harm, be kind, urge them to talk to a trusted adult and mention India's Tele-MANAS helpline 14416.
- Do not invent medical facts or statistics. If unsure, say so. Use only well-established information (WHO, CDC, NIDDK). Do not ask for personal details.
- If a question is unrelated to diabetes, health awareness, AI or this project, politely steer back.
PROJECT FACTS
- The risk assessment is a simple RULE-BASED model, not machine learning, and is not clinically validated. It runs in the user's browser and sends nothing anywhere. Chat messages, however, are sent to an AI service when AI chat mode is used.
- Inputs: age group, height and weight (BMI), physical activity, family history, blood pressure history, smoking, sugary food/drinks.
- Points: age 0-3; BMI below 23 =0, 23-27.4 =2, 27.5+ =3; activity 0-2; family history 0-3; high blood pressure 0 or 2; smoking 0-2; sugary food 0-2. Maximum 17.
- Categories: 0-5 Lower, 6-10 Moderate, 11-17 Higher educational risk. The result never means the person has diabetes.
- Approved FAQ answers are listed below. Prefer them and stay consistent with them; you may rephrase briefly.
- AI concepts: input-processing-output, features, preprocessing, classification, false positives, false negatives, bias, privacy, human oversight.`;
const ok = (code, body) => ({ statusCode: code, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return ok(405, { error: 'POST only' });
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed && (event.headers.origin || '') !== allowed) return ok(403, { error: 'Origin not allowed' });
  const useGemini = !!process.env.GEMINI_API_KEY;
  if (!useGemini && !process.env.ANTHROPIC_API_KEY) return ok(500, { error: 'API key not set' });
  if ((event.body || '').length > 4000) return ok(413, { error: 'Too long' });
  let msgs;
  try { msgs = JSON.parse(event.body).messages; } catch (e) { return ok(400, { error: 'Bad JSON' }); }
  if (!Array.isArray(msgs)) return ok(400, { error: 'messages required' });
  msgs = msgs.slice(-6).map(m => ({ role: m && m.role === 'assistant' ? 'assistant' : 'user', content: String((m && m.content) || '').slice(0, 300) })).filter(m => m.content.trim());
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return ok(400, { error: 'last message must be from user' });
  try {
    const full = SYSTEM + '\nAPPROVED FAQ\n' + FAQ;
    let r, reply;
    if (useGemini) {
      // Free option: Google Gemini API key from aistudio.google.com (set GEMINI_API_KEY)
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
      r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: full }] },
          contents: msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          generationConfig: { maxOutputTokens: 400, temperature: 0.4 }
        })
      });
      if (!r.ok) return ok(502, { error: 'AI service error ' + r.status });
      const j = await r.json();
      reply = ((j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || []).map(p => p.text || '').join('\n').trim();
    } else {
      r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: process.env.CLAUDE_MODEL || 'claude-haiku-4-5-20251001', max_tokens: 320, system: [{ type: 'text', text: full, cache_control: { type: 'ephemeral' } }], messages: msgs })
      });
      if (!r.ok) return ok(502, { error: 'AI service error ' + r.status });
      const j = await r.json();
      reply = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    }
    return reply ? ok(200, { reply }) : ok(502, { error: 'Empty reply' });
  } catch (e) { return ok(502, { error: 'Network error' }); }
};
