# LENS — Longevity Evidence Navigation System

LENS is a claim‑audit and evidence‑translation demo designed to show the gap between public health/longevity claims and the scientific evidence behind them. It decomposes claims, evaluates curated study packets, highlights mismatches, and generates a transparent Claim–Evidence Gap profile with audience‑specific responsible wording.

---

## 🎯 Purpose

Scientific evidence and public claims often diverge. LENS makes that distance visible by:

- Decomposing a claim into structured fields  
- Reviewing curated evidence packets  
- Classifying evidence maturity, outcome directness, population fit, and uncertainty  
- Triggering mismatch rules  
- Producing a Claim–Evidence Gap profile  
- Generating responsible wording for experts, journalists, policymakers, the public, and low‑literacy audiences  

This demo is **informational only** and not clinical decision support.

---

## 🧪 Demo Claims

The hackathon demo includes two prepared claims:

1. **“Regular exercise supports healthy ageing.”**  
2. **“NMN reverses human ageing.”**

Each claim loads a curated evidence packet and displays:

- Claim decomposition  
- Evidence maturity  
- Outcome directness  
- Population applicability  
- Uncertainty register  
- Gap profile  
- Audience‑specific wording  
- Source drawer + reviewer state  

---

## 🧱 Architecture (Hackathon Version)

- Static JSON evidence packets  
- React front‑end  
- Deterministic rules engine  
- Audience‑mode transformations  
- No live retrieval  
- No personalised recommendations  
- No universal score  

---

## ⚠️ Safety & Intended Use

LENS is an **evidence‑communication tool**, not medical advice.  
It does not diagnose, treat, or recommend interventions.  
All evidence is curated and illustrative.

---

## 📁 Project Structure


