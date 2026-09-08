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
    expert: (claim, gap) =>
      `Expert view: Gap = ${gap.level}. Score = ${gap.score}. Reasons: ${gap.reasons.join(
        "; "
      )}. Evidence maturity = ${claim.evidence.maturity}. Evidence type = ${claim.evidence.evidenceType}.`,

    journalist: (claim, gap) =>
      `Journalist view: The gap is ${gap.level.toLowerCase()}. Key reasons: ${gap.reasons
        .slice(0, 2)
        .join("; ")}.`,

    policymaker: (claim, gap) =>
      `Policymaker view: Gap = ${gap.level}. Evidence currency = ${claim.evidence.evidenceCurrency}. Population fit = ${claim.evidence.populationFit}.`,

    public: (claim, gap) =>
      `Public view: The gap is ${gap.level.toLowerCase()}. This means the proof is ${
        gap.level === "Low" ? "strong" : gap.level === "Medium" ? "mixed" : "weak"
      }.`,

    lowLiteracy: (claim, gap) =>
      `Simple view: Gap is ${gap.level}.`
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
          <h2>Claim</h2>
          <p>{selectedClaim.text}</p>

          <h3>Gap Assessment</h3>
          {(() => {
            const gap = computeGap(selectedClaim);
            const color =
              gap.level === "Low"
                ? "green"
                : gap.level === "Medium"
                ? "orange"
                : "red";

            return (
              <>
                <p>
                  <strong>Gap Level:</strong>{" "}
                  <span style={{ color }}>{gap.level}</span>
                </p>
                <p>
                  <strong>Score:</strong> {gap.score}
                </p>
                <ul>
                  {gap.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <h3>Audience Mode</h3>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  style={{ padding: "0.5rem", marginBottom: "1rem" }}
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
                    borderRadius: "6px"
                  }}
                >
                  <p>{audienceModes[audience](selectedClaim, gap)}</p>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
