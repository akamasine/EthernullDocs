# 1.8 Threat Intel Feeds

Ethernull explicitly integrates natively generated telemetry against third-party global Threat Intelligence Feeds. You can orchestrate the Core to pull down known Indicators of Compromise (IOCs) and match them explicitly.

## Adding Feeds
Ethernull operates using dedicated feed parsers designed for prominent JSON lists.

```bash
# Add Feodo Tracker (C2 endpoints)
ethernull> feeds add feodo-c2 feodo https://feodotracker.abuse.ch/downloads/ipblocklist.csv

# Add Malicious URLHaus targets 
ethernull> feeds add urlhaus urlhaus https://urlhaus.abuse.ch/downloads/csv

# Add AlienVault OTX
ethernull> feeds add otx-pulse otx https://otx.alienvault.com/...

# Map a custom CVE Feed (Compatible with NVD JSON or standard JSON)
ethernull> feeds add my-cves cve https://your-cve-feed.example.com/
```

## Management
Feeds are pulled constantly in the background using cron-interval schedulers. Upon pulling, all indicators are deduplicated against the native **Threat Memory** layer, verifying uniqueness.

```bash
# View all active feed configurations
ethernull> feeds list

# Wipe a targeted feed matching string
ethernull> feeds delete my-cves
```

Whenever a CVE feed is appended, you can explicitly query the Core to match these new indicators across your entire known Agent Baseline Inventory using `inventory vulns`.
