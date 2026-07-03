const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/hospitalData.json");

// Cache the data so we don't re-read the file on every request
let _cachedData = null;

/**
 * Loads hospital data from hospitalData.json.
 * Caches the result after the first successful load.
 * @returns {Object} Hospital data object
 * @throws {Error} If the file cannot be read or parsed
 */
function loadHospitalData() {
  if (_cachedData) return _cachedData;

  try {
    if (!fs.existsSync(DATA_PATH)) {
      throw new Error(`hospitalData.json not found at: ${DATA_PATH}`);
    }
    const rawData = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(rawData);

    // Validate essential fields exist
    const required = ["hospitalName", "address", "contact", "opTimings",
      "emergency", "visitingHours", "departments", "doctors",
      "services", "insuranceProvidersAccepted", "faqs"];

    for (const field of required) {
      if (!parsed[field]) {
        throw new Error(`hospitalData.json is missing required field: "${field}"`);
      }
    }

    _cachedData = parsed;
    return _cachedData;
  } catch (error) {
    throw new Error(`Failed to load hospital data: ${error.message}`);
  }
}

/**
 * Clears the data cache (useful for hot-reloading in dev mode).
 */
function clearCache() {
  _cachedData = null;
}

/**
 * Formats hospital data into a dense, AI-readable context string.
 * Every section is clearly labelled so Gemini can locate facts quickly.
 * @param {Object} data - Hospital data object
 * @returns {String} Formatted hospital data context
 */
function formatHospitalDataContext(data) {
  const doctorBlock = data.doctors.map((doc) =>
    `  • ${doc.name}
    Department     : ${doc.department}
    Specialization : ${doc.specialization}
    Qualification  : ${doc.qualification || "MD"}
    Experience     : ${doc.experience || "—"} years
    Available Days : ${Array.isArray(doc.availableDays) ? doc.availableDays.join(", ") : doc.availableDays}`
  ).join("\n\n");

  const faqBlock = data.faqs.map((f, i) =>
    `  Q${i + 1}: ${f.question}\n  A${i + 1}: ${f.answer}`
  ).join("\n\n");

  return `
=== HOSPITAL INFORMATION DATABASE ===

HOSPITAL NAME: ${data.hospitalName}

ADDRESS:
  ${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zipCode}, ${data.address.country}

CONTACT:
  Phone  : ${data.contact.phone}
  Email  : ${data.contact.email}

OPERATING HOURS (OPD / OP Timings):
  Weekdays (Mon–Fri) : ${data.opTimings.weekdays}
  Saturday           : ${data.opTimings.saturday}
  Sunday             : ${data.opTimings.sunday}

EMERGENCY SERVICES:
  Available   : ${data.emergency.available ? "Yes" : "No"}
  Open 24/7   : ${data.emergency.open24Hours ? "Yes" : "No"}
  Emergency Phone : ${data.emergency.phone}

VISITING HOURS (Patient Visit Timings):
  General Wards : ${data.visitingHours.generalWards}
  ICU           : ${data.visitingHours.icu}
  Maternity     : ${data.visitingHours.maternity}
  Pediatric     : ${data.visitingHours.pediatric}

DEPARTMENTS (${data.departments.length} total):
${data.departments.map((d, i) => `  ${i + 1}. ${d}`).join("\n")}

DOCTORS & SPECIALISTS:
${doctorBlock}

SERVICES OFFERED:
${data.services.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}

INSURANCE PROVIDERS ACCEPTED:
  ${data.insuranceProvidersAccepted.join(", ")}

FREQUENTLY ASKED QUESTIONS:
${faqBlock}

=== END OF DATABASE ===
`.trim();
}

/**
 * Returns the raw hospital data object.
 * @returns {Object}
 */
function getHospitalData() {
  return loadHospitalData();
}

/**
 * Returns the formatted, AI-ready context string.
 * @returns {String}
 */
function getHospitalDataContext() {
  const data = loadHospitalData();
  return formatHospitalDataContext(data);
}

module.exports = {
  loadHospitalData,
  getHospitalData,
  getHospitalDataContext,
  formatHospitalDataContext,
  clearCache,
};
