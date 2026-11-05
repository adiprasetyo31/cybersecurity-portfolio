---
order: 1
title: "A password strength classifier that explains itself and refuses to call weak passwords strong"
tags: ["Security Engineering", "Thesis"]
meta: "Universitas Islam Indonesia · 2026"
metrics:
  - { label: "Accuracy", value: "83.44%" }
  - { label: "Macro F1", value: "0.8121" }
  - { label: "Weak recall", value: "0.7601" }
  - { label: "Weak rated strong", value: "4.73%", before: "15.04%" }
problem: "Credential misuse shows up in 39% of breaches (Verizon DBIR 2026). Rule-based meters miss real patterns like \"Password1!\", and most models treat every error the same, even though rating a weak password as strong is the one that hurts."
action: "Relabeled 669,639 passwords with zxcvbn, engineered 25 features including matches against the 13.8M RockYou leak, and compared 4 algorithms across 2 balancing scenarios. Then tuned asymmetric class thresholds to cap the dangerous error."
outcome: "Random Forest met every target on 133,928 test samples and cut weak-rated-strong errors from 3,841 to 1,207. SHAP shows weak calls are driven by RockYou matches and strong calls by length and entropy, in line with NIST SP 800-63B."
tools: ["Python", "scikit-learn", "Random Forest", "SHAP", "zxcvbn", "FastAPI", "React + TypeScript"]
links:
  - { label: "View repository on GitHub", href: "https://github.com/adiprasetyo31/obsidian-vault-PSM-with-Machine-Learning" }
---
