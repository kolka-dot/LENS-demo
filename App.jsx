import React, { useState } from "react";

export default function App() {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [audience, setAudience] = useState("public");

  // -----------------------------------------
  // PHASE A — UPGRADED EVIDENCE ARCHITECTURE
  // -----------------------------------------

  const claims = [
    {
      id: "exercise",
      text: "Regular exercise supports healthy ageing.",
      claimIntensity: "Moderate", // how strong the claim is
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
      },
      gap: {
        level: "Low",
        explanation: "Evidence strongly supports the claim with direct human outcomes."
      }
    },

    {
      id: "nmn",
      text: "NMN reverses human ageing.",
      claimIntensity: "Strong", // very strong claim
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
      },
      gap: {
        level: "High",
        explanation:
          "Evidence does not support reversal of ageing in humans; outcomes are indirect and uncertain."
      }
    }
  ];

  // -----------------------------------------
  // AUDIENCE MODES (still Phase A version)
  // -----------------------------------------

  const audienceModes = {
    expert: (claim) =>
      `Expert view: Evidence maturity = ${claim.evidence.maturity}. Outcome directness = ${claim.evidence.outcomeDirectness}. Evidence type = ${claim.evidence.evidenceType}. Population fit = ${claim.evidence.populationFit}. Uncertainty = ${claim.evidence.uncertainty}. Gap: ${claim.gap.explanation}`,

    journalist: (claim) =>
      `Journalist view: Evidence is rated ${claim.evidence.maturity} with ${claim.evidence.outcomeDirectness.toLowerCase()} outcomes. Evidence type: ${claim.evidence.evidenceType}. Uncertainty: ${claim.evidence.uncertainty.toLowerCase()}. Gap: ${claim.gap.explanation}`,

    policymaker: (claim) =>
      `Policymaker view: Evidence maturity = ${claim.evidence.maturity}. Population applicability: ${claim.evidence.populationFit}. Evidence currency: ${claim.evidence.evidenceCurrency}. Gap: ${claim.gap.explanation}`,

    public: (claim) =>
      `Public view: The evidence is ${claim.evidence.maturity.toLowerCase()} and has ${claim.evidence.uncertainty.toLowerCase()} uncertainty. Gap: ${claim.gap.explanation}`,

    lowLiteracy: (claim) =>
      `Simple view: The proof is ${claim.evidence.maturity.toLowerCase()}. The gap is: ${claim.gap.level}.`
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>LENS Demo — Upgraded Evidence Architecture</h1>
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

          <h3>Evidence Packet</h3>
          <ul>
            <li>Maturity: {selectedClaim.evidence.maturity}</li>
            <li>Maturity Ladder: {selectedClaim.evidence.maturityLadder}</li>
            <li>Outcome Directness: {selectedClaim.evidence.outcomeDirectness}</li>
            <li>Evidence Type: {selectedClaim.evidence.evidenceType}</li>
            <li>Evidence Date: {selectedClaim.evidence.evidenceDate}</li>
            <li>Evidence Currency: {selectedClaim.evidence.evidenceCurrency}</li>
            <li>Population Fit: {selectedClaim.evidence.populationFit}</li>
            <li>Uncertainty: {selectedClaim.evidence.uncertainty}</li>
            <li>Uncertainty Register: {selectedClaim.evidence.uncertaintyRegister}</li>
          </ul>

          <h3>Sources</h3>
          <ul>
            {selectedClaim.evidence.sources.map((src, i) => (
              <li key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.title}
                </a>{" "}
                ({src.type})
              </li>
            ))}
          </ul>

          <p>
            <strong>Reviewer:</strong> {selectedClaim.evidence.reviewer.type} — Updated{" "}
            {selectedClaim.evidence.reviewer.updated}
          </p>

          <h3>Gap Assessment</h3>
          <p>
            <strong>Level:</strong> {selectedClaim.gap.level}
          </p>
          <p>{selectedClaim.gap.explanation}</p>

          {/* AUDIENCE MODE */}
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
            <p>{audienceModes[audience](selectedClaim)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
