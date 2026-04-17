# 1.7 Red Phantom (AI Red Team)

Ethernull possesses **Red Phantom**, a localized AI-driven Red Team simulation system integrated natively into the orchestrator. Rather than waiting passively for an external breach, you can instruct the Brain to autonomously plot and execute authentic attack cycles against your own deployment.

## Booting Red Phantom
Phantom utilizes an independent, highly-tooled Kali Linux Docker container preloaded with penetration testing toolsets (`nmap`, `hydra`, `nikto`, `gobuster`, `sqlmap`, `metasploit`).

To activate the red-vessel via docker:
```bash
# Export the required secret binding Phantom to the Core
export PHANTOM_SECRET="your-secret"

# Boot the node restricted internally (attacks only within the Docker network)
docker compose --profile phantom up -d

# Boot the node externally (granted access to attack LAN)
docker compose --profile phantom-external up -d
```

## Commanding Phantom
You can physically drive Phantom explicitly using the CLI to quickly launch recon commands securely from the Ethernull shell:
```bash
ethernull> phantom exec nmap -sV 172.18.0.5
```

## Autonomous Campaigns
The true objective of Red Phantom is unsupervised attack chains. Instead of running a single command, you command the Brain to start a holistic campaign. 

### CLI Deployment
```bash
ethernull> phantom campaign start web-srv-01 --objective "test SSH hardening"

# View active campaigns
ethernull> phantom campaign

# Halt all active exploitation attempts instantly
ethernull> phantom kill
```

### Brain Mode Deployment
You can invoke Phantom seamlessly via natural language while inside the Brain:
```bash
brain> run a red team campaign against web-srv-01, focus on web application vulnerabilities
brain> check what phantom found in the last campaign
```

### How the AI Operates
1. The **Brain** establishes a targeted objective.
2. It maps out reconnaissance routes and begins executing terminal commands against Kali via `phantom exec`.
3. Following each execution round, the Brain halts and asks the Hive (`phantom query hive`) what it managed to detect natively. 
4. The Brain dynamically pivots based on detection success—shifting to stealthier persistence mechanisms if the Hive alerts heavily.
5. The campaign finalizes by outputting a human-readable security posture report detailing success, failure, and detection gaps.
