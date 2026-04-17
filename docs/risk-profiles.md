# 1.11 Risk Scores & Attacker Profiles

Instead of navigating thousands of abstract JSON alerts, Ethernull provides the ability to gauge relative endpoint threats via composite **Risk Scoring**, directly correlated mathematically against standard MITRE ATT&CK framework vectors.

## Risk Assessment

The Risk Engine continuously computes a standardized `0-100` ranking taking into consideration 8 isolated factors (e.g., repeating severity thresholds, anomalous baselines, known vulnerabilities). 

To rapidly assess exactly what is the most pressing threat inside your deployment right now:
```bash
# View the highest risk targets
ethernull> risk
```

If `web-srv-01` exhibits a `95/100` rating, you can immediately explode that calculation to justify exactly *why* that score mathematically triggered:
```bash
ethernull> risk web-srv-01
```

## Attacker Profiles and Attack Chains

Beyond localized endpoint risk, Ethernull correlates behaviors into distinct **Attacker Profiles**. If an external IP performs an Nmap scan against Node 1, and then subsequently triggers a failed bruteforce on Node 2, Ethernull groups them correctly into an active kill-chain.

```bash
# View the known profiles the system is tracking (Attack Mapping)
ethernull> profiles

# Display exactly the killchain progress mapping specific vectors
ethernull> profiles <id>
```

Finally, to view instances where multi-stage sequences are advancing simultaneously across your clusters, check the active chains engine:
```bash
ethernull> chains
```
