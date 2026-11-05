---
order: 2
title: "Pivoting from one suspicious VPN login to a wider malware campaign"
tags: ["Threat Intel", "SOC Analyst"]
meta: "TryHackMe · Just a VPN Login · Oct 2026"
problem: "A VPN login looked off, and it was tied to an unknown binary. Is it a one-off, or part of something bigger?"
action: "Looked up the source ASN and exposed services, checked the file hash reputation, then pivoted on certificate SAN fields to find linked domains and read the matching YARA rule."
outcome: "Tied the login to a known infostealer campaign with a cluster of related domains, and mapped attacker behaviour to MITRE ATT&CK techniques."
tools: ["Hash reputation", "ASN lookup", "Certificate pivoting", "YARA", "MITRE ATT&CK"]
links:
  - { label: "Read report (PDF)", href: "/reports/Threat_Intel_VPN_Login_Report_AdiPrasetyo.pdf" }
---
