# Detection Engine

Ethernull employs a multi-tiered threat detection architecture. Rather than relying solely on static signatures, it utilizes an event processing pipeline capable of contextualizing alerts against learned baselines and stringing them together into overarching multi-stage attack chains.

## Event Pipeline Flow

The central nervous system of the Detection Engine follows a strict path for every ingested event payload:
`ingest → baseline observe → correlation enrich → correlation process → alert → auto-response`

## Baseline Engine and Anomaly Detection

Ethernull detects unusual endpoint behavior through dynamic tracking using **Welford's online algorithm**. This establishes an incremental mean, variance, and standard deviation for resource consumption without retaining infinite historical data.

There are two primary categories of continuous learning:
1. **Event Baselines**: Requires 50 samples and a 1-hour maturity threshold.
2. **Metrics Baselines**: Requires 100 samples and a 2-hour maturity threshold. Focuses on tracking anomalies for CPU, memory, disk, network deltas, and process footprints.

Deviation alerts trigger exactly when activity exceeds a **Z-score threshold of 3.0**.

## Correlation Rules

The system operates 12 deterministic correlation rules evaluated on a sliding window.

1. **BruteForceEscalation**: Triggers on 3 brute-force events within 10m (cooldown 15m). Severity: Critical. Auto-response: `ISOLATE`.
2. **SuspiciousProcessBurst**: Cluster of 3 suspicious processes in 5m. Severity: High.
3. **DeletedBinaryAlert**: Execution of a deleted binary (1 event / 1m window). Severity: Critical. Auto-response: `QUARANTINE`.
4. **NetworkReconAlert**: 3 new rapid listener ports created in 2m. Severity: High.
5. **CrossAgentAuthAttack**: Lateral movement indicator: 5 cross-agent auth failures from the same source in 10m. Severity: Critical. Auto-response: `ISOLATE`.
6. **HighSeverityFlood**: Catch-all for active attacks: 10 high-severity events in 5m. Severity: Critical.
7. **FileIntegrityViolation**: 2 FIM tampering alerts internally linked within 5m. Severity: Critical. Auto-response: `REPORT`.
8. **AgentTamperDetected**: Modification of Ethernull agent binaries on disk. Severity: Critical. Auto-response: `REPORT`.
9. **PortScanDetected**: Detected external network sweep. Severity: High.
10. **CrossAgentScanSweep**: Synchronized port scans across 2+ agents from identical origin. Severity: Critical. Auto-response: `ISOLATE`.
11. **MetricsAnomalyAlert**: Anomalous deviations on endpoint metrics surpassing 3.0 z-score. Severity: High. Auto-response: `REPORT`.
12. **SustainedMetricsAnomaly**: If 3 sustained metric anomalies fire within 10m. Severity: Critical. Auto-response: `REPORT`.

## Chain Detector

The Chain Detector monitors `Alert` progressions to detect Advanced Persistent Threats executing campaigns. It categorizes actions by mapping attacker IP addresses across **Multi-Stage Attack Chains**:

When a chain surpasses its configured trigger threshold, it escalates to an `attack_chain` alert.
The defined sequences are:
1. **Full Intrusion Campaign:** Complete path (recon → access → lateral → execution). Requires 3 stages.
2. **Credential Exploit to Lateral Movement:** (access → lateral → execution). Requires 2 stages.
3. **Reconnaissance to Initial Access:** (recon → access). Requires 2 stages.
4. **Lateral Movement to Persistence:** (lateral → evasion → agent tamper). Requires 2 stages.
5. **Defense Evasion Campaign:** Disabling guards before striking. Requires 2 stages.
6. **Smash and Grab:** Extremely fast access and impact. Barely any downtime. Requires 2 stages.
7. **Slow Burn Campaign:** An extremely patient progression across hours/days. Requires 3 stages to confirm. 
