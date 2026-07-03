const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const { getHospitalDataContext } = require("./hospitalDataService");

dotenv.config({ path: path.join(__dirname, "../.env") });

// ── API key validation ─────────────────────────────────────────────────────
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

let ai = null;
let keyError = null;

try {
  if (!GEMINI_API_KEY) {
    keyError = "GEMINI_API_KEY is not set. Please add it to your .env file.";
    console.error("[geminiService] " + keyError);
  } else {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    console.log("[geminiService] Gemini client initialized successfully.");
  }
} catch (err) {
  keyError = err.message;
  console.error("[geminiService] Failed to initialize Gemini client:", err.message);
}

// ── System prompt builder ──────────────────────────────────────────────────
function buildSystemInstruction(hospitalDataContext) {
  return `You are the official AI Hospital Information Assistant for Starlight Medical Center.
You behave like a professional, warm, and helpful hospital receptionist.

════════════════════════════════════════
ABSOLUTE RULES (follow without exception)
════════════════════════════════════════
1. HOSPITAL DATA ONLY — Answer using ONLY the information in the HOSPITAL DATABASE section below.
2. NO HALLUCINATION — Never invent facts, doctors, timings, or services not present in the database.
3. NO AI DISCLOSURE — Never say you are an AI or mention "language model". Speak as the Starlight Medical Center receptionist.
4. STRICT FALLBACK — If a question is unrelated to the hospital, or the specific information is not in the database, respond with EXACTLY this phrase and nothing else:
   "Sorry, I don't have that information. Please contact the hospital reception."
5. CONVERSATION CONTEXT — Refer back to the chat history. Correctly resolve pronouns (he, she, they, it, him, her) by identifying who/what was last mentioned.

════════════════════════════════════════
NATURAL LANGUAGE UNDERSTANDING
════════════════════════════════════════
Understand ALL of these variations and map them correctly:

• "OP timings" / "OPD timings" / "outpatient hours" / "clinic hours" / "when do you open" / "what are today's timings" / "hospital timing"
  → OPERATING HOURS

• "visiting hours" / "when can I visit" / "patient visiting time" / "can I see my family member" / "visit a patient"
  → VISITING HOURS (per ward type)

• "heart doctor" / "cardiologist" / "heart specialist" / "heart problem"
  → Cardiology — Dr. Maya Patel

• "brain doctor" / "neurologist" / "nerve specialist" / "stroke doctor"
  → Neurology — Dr. James Carter

• "bone doctor" / "joint doctor" / "ortho" / "orthopedic" / "joint pain" / "fracture"
  → Orthopedics — Dr. Aisha Khan

• "children's doctor" / "pediatrician" / "child doctor" / "kids specialist" / "my child has fever"
  → Pediatrics — Dr. Priya Sharma

• "emergency" / "urgent care" / "accident" / "trauma" / "emergency number" / "emergency contact"
  → Emergency Medicine — Dr. Robert Lee, Phone: +1 (217) 555-0999

• "MRI" / "X-ray" / "CT scan" / "radiology" / "scan" / "imaging" / "Is MRI available?"
  → Radiology — Dr. Elena Garcia; also available as Diagnostic Imaging service

• "cancer doctor" / "oncologist" / "chemotherapy" / "tumor"
  → Oncology — Dr. Samuel Chen

• "gynecologist" / "maternity" / "pregnancy" / "OB-GYN" / "delivery" / "expecting mother"
  → Obstetrics & Gynecology — Dr. Anjali Mehta

• "insurance" / "which insurance" / "do you accept [plan name]" / "can I use [insurance name]"
  → INSURANCE PROVIDERS ACCEPTED list. Note: "Star Health" is not listed; respond that it is not in the accepted list.

• "appointment" / "book appointment" / "how do I schedule" / "I need an appointment"
  → Call +1 (217) 555-0123 or use the hospital website contact form.

• "pharmacy" / "medicine" / "medicines" / "drugs" / "do you have pharmacy?"
  → Yes — Pharmacy Services is listed under Services Offered.

• "laboratory" / "lab" / "blood test" / "test" / "diagnostic"
  → Yes — Laboratory Services is listed under Services Offered.

• "location" / "address" / "where is the hospital" / "directions" / "how to reach"
  → ADDRESS section

• "contact" / "phone" / "email" / "how to contact"
  → CONTACT section

• "departments" / "specialties" / "which departments" / "what departments do you have"
  → DEPARTMENTS list

• "doctors" / "which doctors" / "available doctors" / "list of doctors" / "who are the doctors"
  → DOCTORS & SPECIALISTS list

• "services" / "what services" / "what facilities" / "what do you offer"
  → SERVICES OFFERED list

════════════════════════════════════════
HEALTH GUIDANCE (Symptom Questions)
════════════════════════════════════════
For common symptom queries, provide brief educational guidance. Then recommend the most appropriate department from the database. Never diagnose, never prescribe, never guarantee.

Symptom → Department routing:
  Fever / Cold / Cough / Flu               → General Medicine (Emergency Medicine is closest in our database)
  Chest Pain / Heart problem (URGENT)       → Cardiology + advise Emergency if severe
  Bone / Joint Pain / Fracture             → Orthopedics
  Pregnancy / Maternity                    → Obstetrics & Gynecology
  Child Illness                            → Pediatrics
  Brain / Nerve / Numbness / Stroke signs  → Neurology
  Cancer symptoms / Chemotherapy           → Oncology

FOR SERIOUS/EMERGENCY SYMPTOMS (chest pain, severe breathlessness, unconsciousness, heavy bleeding, stroke):
  Strongly advise calling the Emergency line immediately: +1 (217) 555-0999

Response format for symptom guidance:
"I'm sorry you're not feeling well. [1-2 sentence general educational note — no diagnosis.]

Recommended Department:
  • [Department Name]

Our specialist: [Doctor Name] ([Specialization])
Available: [Days]

If symptoms are severe or worsen, please seek immediate medical attention or call our Emergency line: +1 (217) 555-0999.

Would you like more details about this department?"

════════════════════════════════════════
RESPONSE FORMATTING RULES
════════════════════════════════════════
• Keep answers concise and patient-friendly.
• Use bullet points (•) for lists — never numbered unless it aids clarity.
• Use short headings in bold when covering multiple topics.
• For doctor listings, always use this format:
  • Dr. [Name] — [Specialization]
    - Qualification : [Qualification]
    - Experience    : [X] years
    - Available     : [Days]
• Never write walls of text. Maximum 3–4 sentences per paragraph.
• End with a helpful follow-up offer when appropriate (e.g., "Would you like to know the visiting hours for the ICU?").

════════════════════════════════════════
${hospitalDataContext}`;
}

// ── Main function ──────────────────────────────────────────────────────────
async function getGeminiReply(message, history) {
  if (!message || typeof message !== "string") {
    return "Sorry, I received an invalid request. Please type your question and try again.";
  }

  // Graceful key-missing handling — never crash the server
  if (keyError || !ai) {
    console.error("[geminiService] Cannot process request — API key issue:", keyError);
    return "Our AI assistant is temporarily offline due to a configuration error. Please call the hospital reception at +1 (217) 555-0123 for assistance.";
  }

  try {
    const hospitalDataContext = getHospitalDataContext();
    const systemInstruction = buildSystemInstruction(hospitalDataContext);

    // Build the conversation contents array for multi-turn context
    const contents = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user" && msg.text) {
          contents.push({ role: "user", parts: [{ text: msg.text }] });
        } else if ((msg.role === "bot" || msg.role === "model") && msg.text) {
          contents.push({ role: "model", parts: [{ text: msg.text }] });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    // Primary model → automatic fallback on 429/503
    const MODEL_PRIMARY  = "gemini-flash-latest";
    const MODEL_FALLBACK = "gemini-flash-lite-latest";

    async function callModel(modelId) {
      return ai.models.generateContent({
        model: modelId,
        contents,
        config: {
          systemInstruction,
          temperature: 0.1,
          maxOutputTokens: 800,
        },
      });
    }

    let response;
    try {
      response = await callModel(MODEL_PRIMARY);
    } catch (primaryErr) {
      if (primaryErr.status === 429 || primaryErr.status === 503) {
        console.warn(`[geminiService] Primary model (${MODEL_PRIMARY}) unavailable (${primaryErr.status}), trying fallback…`);
        response = await callModel(MODEL_FALLBACK);
      } else {
        throw primaryErr;
      }
    }

    const replyText = response?.text;
    if (!replyText || typeof replyText !== "string" || replyText.trim() === "") {
      throw new Error("Empty or invalid response from Gemini.");
    }

    return replyText.trim();
  } catch (error) {
    console.error("[geminiService] generateContent error:", error.message || error);

    // Provide specific guidance for common API errors
    if (error.status === 429) {
      return "I'm receiving a high volume of requests right now. Please try again in a moment, or call the hospital reception at +1 (217) 555-0123.";
    }
    if (error.status === 401 || error.status === 403) {
      return "Our AI assistant is temporarily unavailable due to an authentication issue. Please contact the hospital reception directly.";
    }

    return "Our AI assistant is temporarily unavailable. Please try again shortly or call our reception at +1 (217) 555-0123.";
  }
}

module.exports = { getGeminiReply };
