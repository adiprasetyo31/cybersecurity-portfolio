---
order: 3
title: "Triaging a reported phishing email"
tags: ["Incident Responder", "SOC Level 1"]
meta: "Phishing Analysis Fundamentals · Oct 2026"
problem: "A user reported a suspicious email. Is it malicious, what should be blocked, and how do we stop the next one?"
action: "Read the full headers (Return-Path, Reply-To, Received chain), checked SPF, DKIM and DMARC results, and pulled URLs and attachments for reputation checks, looking up hashes before uploading anything."
outcome: "A one page verdict with IOCs and a recommended block list. Prevention controls are the room I'm working through now."
tools: ["Email headers", "SPF · DKIM · DMARC", "URL and hash reputation", "CyberChef"]
links:
  - { label: "Read report (PDF)", href: "/reports/Phishing_Analysis_Report_AdiPrasetyo.pdf" }
---
