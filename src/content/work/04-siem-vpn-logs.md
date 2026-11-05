---
order: 4
title: "Hunting through VPN logs in Kibana and Splunk"
tags: ["SOC Analyst", "SIEM"]
meta: "Splunk: The Basics · Elastic Stack: The Basics · Oct 2026"
problem: "Thousands of VPN connection events. Which users, sources and time windows actually need attention?"
action: "Wrote KQL queries and filter pills in Kibana, narrowed by time range and field values, and ran the same kind of search in Splunk with SPL."
outcome: "Learned to debug my own queries: a wrong date comparison and a time filter mismatch were giving me wrong counts until I fixed them."
tools: ["Elastic / Kibana", "KQL", "Splunk", "SPL"]
links:
  - { label: "Read report (PDF)", href: "/reports/VPN_Log_Investigation_Kibana_Report_AdiPrasetyo.pdf" }
---
