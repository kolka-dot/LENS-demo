import React, { useState } from "react";

export default function App() {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [audience, setAudience] = useState("public");

  // -----------------------------------------
  // PHASE A — EVIDENCE ARCHITECTURE (kept)
  // PHASE B — GAP ENGINE (new)
  // -----------------------------------------

  const claims = [
    {
      id: "exercise",
      text: "Regular exercise supports healthy ageing.",
      claimIntensity: "Moderate",
      evidence: {
        maturity: "High",
        maturityLadder: "Multiple large human RCTs + WHO guidelines",
        outcomeDirectness: "Direct",
        evidenceType: "Human",
        evidenceDate: "2023",
        evidenceCurrency: "Current",
        populationFit: "General adult population",
        uncertainty: "Low",
        uncertaintyRegister: "Consistent findings across populations",
        sources: [
          {
            title: "WHO Physical Activity Guidelines",
            url: "https://www.who.int/publications/i/item/9789240015128",
            type: "Guideline"
          },
          {
            title: "NIH Exercise & Ageing Review 2023",
            url: "https://www.nih.gov",
            type: "Systematic Review"
          },
          {
            title: "Lancet Healthy Ageing Series",
            url: "https://www.thelancet.com",
            type: "Peer-reviewed"
          }
        ],
        reviewer: {
          type: "Curated demo packet",
          updated: "2024-01"
        }
      }
    },

    {
      id: "nmn",
      text: "NMN reverses human ageing.",
      claimIntensity: "Strong",
      evidence: {
        maturity: "Low",
        maturityLadder: "Animal studies + surrogate markers",
        outcomeDirectness: "Indirect",
        evidenceType: "Animal + surrogate",
        evidenceDate: "2016–2020",
        evidenceCurrency: "Outdated",
        populationFit: "Not established for humans",
        uncertainty: "High",
        uncertaintyRegister: "Small uncontrolled human trials; inconsistent results",
        sources: [
          {
            title: "Mouse metabolic studies (2016–2020)",
            url: "https://pubmed.ncbi.nlm.nih.gov",
            type: "Animal Study"
          },
          {
            title: "Small uncontrolled human trials",
            url: "https://clinicaltrials.gov",
            type: "Pilot Study"
          },
          {
            title: "FDA warning letters on NMN marketing",
            url: "https://www.fda.gov",
            type: "Regulatory"
          }
        ],
        reviewer: {
          type: "Curated demo packet",
          updated: "2024-01"
        }
      }
    }
  ];

  // -----------------------------------------
  // PHASE B — GAP ENGINE
  // -----------------------------------------

  function computeGap(claim) {
    let score = 0;
    let reasons = [];

    // Claim intensity vs evidence maturity
    if (claim.claimIntensity === "Strong" && claim.evidence.maturity !== "High") {
      score += 2;
      reasons.push("Strong claim but evidence maturity is not high.");
    }

    // Evidence type penalties
    if (claim.evidence.evidenceType.includes("Animal")) {
      score += 2;
      reasons.push("Evidence relies on animal or surrogate markers.");
    }

    // Outcome directness
    if (claim.evidence.outcomeDirectness !== "Direct") {
      score += 1;
      reasons.push("Outcomes are indirect.");
    }

    // Population fit
    if (claim.evidence.populationFit.includes("Not")) {
      score += 2;
      reasons.push("Population fit is not established for humans.");
    }

    // Evidence currency
    if (claim.evidence.evidenceCurrency === "Outdated") {
      score += 1;
      reasons.push("Evidence is outdated.");
    }

    // Uncertainty
    if (claim.evidence.uncertainty === "High") {
      score += 2;
      reasons.push("High uncertainty in evidence.");
    }

    // Determine gap level
    let level = "Low";
    if (score >= 2 && score <= 4) level = "Medium";
    if (score >= 5) level = "High";

    return {
      score,
      level,
      reasons
    };
  }

  // -----------------------------------------
  // AUDIENCE MODES (Phase B aware)
  // -----------------------------------------
const audienceModes = {
  expert: (claim, gap) => {
    return `
Expert view:
• Gap level: ${gap.level} (score ${gap.score})
• Mismatch triggers: ${gap.reasons.join("; ")}
• Evidence maturity: ${claim.evidence.maturity} — ${claim.evidence.maturityLadder}
• Outcome directness: ${claim.evidence.outcomeDirectness}
• Evidence type: ${claim.evidence.evidenceType}
• Population fit: ${claim.evidence.populationFit}
• Uncertainty register: ${claim.evidence.uncertaintyRegister}
• Evidence currency: ${claim.evidence.evidenceCurrency}
    `.trim();
  },

  journalist: (claim, gap) => {
    return `
Journalist view:
This claim has a ${gap.level.toLowerCase()} evidence gap. 
Safe wording: “Current research suggests ${claim.text.toLowerCase()} may be possible, 
but the available evidence is ${claim.evidence.maturity.toLowerCase()} and shows ${claim.evidence.outcomeDirectness.toLowerCase()} outcomes.”
Key caution points: ${gap.reasons.slice(0, 2).join("; ")}.
Avoid definitive language. Avoid implying causality unless supported.
    `.trim();
  },

  policymaker: (claim, gap) => {
    return `
Policymaker view:
Gap level: ${gap.level}. 
Evidence currency: ${claim.evidence.evidenceCurrency}.
Population applicability: ${claim.evidence.populationFit}.
Action justification:
• Supported: Policies encouraging further research, monitoring, or pilot programs.
• Not supported: Large-scale implementation or public health claims without stronger evidence.
• Premature: Any claim implying reversal of ageing or population-wide effects.
    `.trim();
  },

  public: (claim, gap) => {
    return `
Public view:
The evidence gap is ${gap.level.toLowerCase()}. 
This means the proof is ${
      gap.level === "Low" ? "strong" :
      gap.level === "Medium" ? "mixed" :
      "weak"
    }.
What we know: ${claim.evidence.maturityLadder}.
What we don’t know yet: ${gap.reasons.slice(0, 1)}.
    `.trim();
  },

  lowLiteracy: (claim, gap) => {
    return `
Simple view:
The gap is ${gap.level}. 
This means the proof is ${
      gap.level === "Low" ? "good" :
      gap.level === "Medium" ? "unclear" :
      "not good"
    }.
Here is the main reason: ${gap.reasons[0]}.
    `.trim();
  }
};



  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>LENS Demo — Phase B (Gap Engine)</h1>
      <p>Select a claim to view its evidence packet and gap profile.</p>

      {/* CLAIM LIST */}
      <div style={{ marginBottom: "2rem" }}>
        {claims.map((claim) => (
          <button
            key={claim.id}
            onClick={() => setSelectedClaim(claim)}
            style={{
              display: "block",
              marginBottom: "1rem",
              padding: "1rem",
              fontSize: "1rem"
            }}
          >
            {claim.text}
          </button>
        ))}
      </div>

      {/* CLAIM DETAILS */}
      {selectedClaim && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1.5rem",
            borderRadius: "8px"
          }}
        >
         <h2 style={{ marginBottom: "0.5rem" }}>Claim</h2>
<div
  style={{
    background: "#f0f4ff",
    padding: "1rem",
    borderRadius: "6px",
    marginBottom: "1.5rem",
    border: "1px solid #d0dbff"
  }}
>
  <strong>{selectedClaim.text}</strong>
</div>
          {/* EVIDENCE BADGES */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1.5rem"
  }}
>
  <span
    style={{
      background: "#e8f5e9",
      padding: "0.4rem 0.7rem",
      borderRadius: "6px",
      border: "1px solid #c8e6c9",
      fontSize: "0.85rem"
    }}
  >
    Maturity: <strong>{selectedClaim.evidence.maturity}</strong>
  </span>

  <span
    style={{
      background: "#fff3e0",
      padding: "0.4rem 0.7rem",
      borderRadius: "6px",
      border: "1px solid #ffe0b2",
      fontSize: "0.85rem"
    }}
  >
    Currency: <strong>{selectedClaim.evidence.evidenceCurrency}</strong>
  </span>

  <span
    style={{
      background: "#e3f2fd",
      padding: "0.4rem 0.7rem",
      borderRadius: "6px",
      border: "1px solid #bbdefb",
      fontSize: "0.85rem"
    }}
  >
    Directness: <strong>{selectedClaim.evidence.outcomeDirectness}</strong>
  </span>

  <span
    style={{
      background: "#f3e5f5",
      padding: "0.4rem 0.7rem",
      borderRadius: "6px",
      border: "1px solid #e1bee7",
      fontSize: "0.85rem"
    }}
  >
    Evidence Type: <strong>{selectedClaim.evidence.evidenceType}</strong>
  </span>

  <span
    style={{
      background: "#fbe9e7",
      padding: "0.4rem 0.7rem",
      borderRadius: "6px",
      border: "1px solid #ffccbc",
      fontSize: "0.85rem"
    }}
  >
    Population Fit: <strong>{selectedClaim.evidence.populationFit}</strong>
  </span>

  <span
    style={{
      background: "#f9fbe7",
      padding: "0.4rem 0.7rem",
      borderRadius: "6px",
      border: "1px solid #f0f4c3",
      fontSize: "0.85rem"
    }}
  >
    Uncertainty: <strong>{selectedClaim.evidence.uncertaintyRegister}</strong>
  </span>
</div>
          

{/* GAP BAR */}
{(() => {
  const gap = computeGap(selectedClaim);

  const gapColor =
    gap.level === "Low"
      ? "#4caf50"
      : gap.level === "Medium"
      ? "#ff9800"
      : "#f44336";

  return (
    <>
      <h3 style={{ marginTop: "1rem" }}>Gap Assessment</h3>

      {/* Gap bar */}
      <div
        style={{
          height: "12px",
          background: "#eee",
          borderRadius: "6px",
          marginBottom: "1rem",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width:
              gap.level === "Low"
                ? "33%"
                : gap.level === "Medium"
                ? "66%"
                : "100%",
            background: gapColor,
            height: "100%"
          }}
        ></div>
      </div>

      {/* Gap level */}
      <p>
        <strong>Gap Level:</strong>{" "}
        <span style={{ color: gapColor }}>{gap.level}</span>
      </p>

      {/* Reasons */}
      <div
        style={{
          background: "#fafafa",
          padding: "1rem",
          borderRadius: "6px",
          border: "1px solid #e0e0e0",
          marginBottom: "1.5rem"
        }}
      >
        <strong>Why this gap exists:</strong>
        <ul style={{ marginTop: "0.5rem" }}>
          {gap.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Audience Mode */}
      <h3>Audience Mode</h3>
      <select
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      >
        <option value="expert">Expert</option>
        <option value="journalist">Journalist</option>
        <option value="policymaker">Policymaker</option>
        <option value="public">Public</option>
        <option value="lowLiteracy">Low Literacy</option>
      </select>

      <div
        style={{
          background: "#f7f7f7",
          padding: "1rem",
          borderRadius: "6px",
          border: "1px solid #ddd"
        }}
      >
        <p style={{ whiteSpace: "pre-line" }}>
          {audienceModes[audience](selectedClaim, gap)}
        </p>
      </div>
    </>
  );
})()}

                 return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>LENS Demo — Phase B (Gap Engine)</h1>
      <p>Select a claim to view its evidence packet and gap profile.</p>

      {/* CLAIM LIST */}
      <div style={{ marginBottom: "2rem" }}>
        {claims.map((claim) => (
          <button
            key={claim.id}
            onClick={() => setSelectedClaim(claim)}
            style={{
              display: "block",
              marginBottom: "1rem",
              padding: "1rem",
              fontSize: "1rem"
            }}
          >
            {claim.text}
          </button>
        ))}
      </div>

      {/* CLAIM DETAILS */}
      {selectedClaim && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1.5rem",
            borderRadius: "8px"
          }}
        >
         <h2 style={{ marginBottom: "0.5rem" }}>Claim</h2>
<div
  style={{
    background: "#f0f4ff",
    padding: "1rem",
    borderRadius: "6px",
    marginBottom: "1.5rem",
    border: "1px solid #d0dbff"
  }}
>
  <strong>{selectedClaim.text}</strong>
</div>

{/* GAP BAR */}
{(() => {
  const gap = computeGap(selectedClaim);

  const gapColor =
    gap.level === "Low"
      ? "#4caf50"
      : gap.level === "Medium"
      ? "#ff9800"
      : "#f44336";

  return (
    <>
      <h3 style={{ marginTop: "1rem" }}>Gap Assessment</h3>

      {/* Gap bar */}
      <div
        style={{
          height: "12px",
          background: "#eee",
          borderRadius: "6px",
          marginBottom: "1rem",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width:
              gap.level === "Low"
                ? "33%"
                : gap.level === "Medium"
                ? "66%"
                : "100%",
            background: gapColor,
            height: "100%"
          }}
        ></div>
      </div>

      {/* Gap level */}
      <p>
        <strong>Gap Level:</strong>{" "}
        <span style={{ color: gapColor }}>{gap.level}</span>
      </p>

      {/* Reasons */}
      <div
        style={{
          background: "#fafafa",
          padding: "1rem",
          borderRadius: "6px",
          border: "1px solid #e0e0e0",
          marginBottom: "1.5rem"
        }}
      >
        <strong>Why this gap exists:</strong>
        <ul style={{ marginTop: "0.5rem" }}>
          {gap.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Audience Mode */}
      <h3>Audience Mode</h3>
      <select
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      >
        <option value="expert">Expert</option>
        <option value="journalist">Journalist</option>
        <option value="policymaker">Policymaker</option>
        <option value="public">Public</option>
        <option value="lowLiteracy">Low Literacy</option>
      </select>

      <div
        style={{
          background: "#f7f7f7",
          padding: "1rem",
          borderRadius: "6px",
          border: "1px solid #ddd"
        }}
      >
        <p style={{ whiteSpace: "pre-line" }}>
          {audienceModes[audience](selectedClaim, gap)}
        </p>
      </div>
    </>
  );
})()} 
        </div>
      )}
    </div>
  );
}

