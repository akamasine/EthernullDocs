# Documentation Website Instructions

You are building the official documentation website for **Ethernull** — an autonomous hive-mind security intelligence system. Read the codebase before writing. This file tells you what to document, how to structure it, and what tone to use.

---

## What is Ethernull?

Ethernull is a distributed security platform where a central brain (Core) manages agents deployed on your endpoints. Agents monitor their hosts — watching for intrusions, collecting system telemetry, inventorying installed software — and report back to Core through a WebSocket gateway. Core correlates events, detects multi-stage attacks, learns behavioral baselines, and responds automatically with graduated escalation.

The system has an LLM-powered consciousness that thinks about your security posture around the clock: triaging alerts, reviewing fleet state, generating shift reports, and — when given autonomy — taking action on its own. It also has Red Phantom, an AI red team that uses a Kali Linux container to autonomously attack your own infrastructure, find detection gaps, and write security improvement reports.

**What makes it different:**
- Everything is autonomous — detection, correlation, response, even red teaming
- The brain learns what's normal for each host and alerts when things deviate
- A single `ethernull` command gives you CLI, TUI, and brain access
- Agents self-heal: if one dies, the system tries to bring it back via SSH
- New CVEs are automatically matched against what's actually installed on your fleet

---

## Documentation Structure

The docs should be split into two main parts: a **User Guide** (how to use Ethernull day-to-day) and a **Reference** (deep dives into each subsystem). A new user should be able to read the User Guide top-to-bottom and operate Ethernull confidently. The Reference is for when they need to understand how something works under the hood.

---

## Part 1: User Guide

This is the most important part. Walk the reader through Ethernull as an operator would actually use it. Avoid implementation details — focus on what things do, not how they're built.

### 1.1 Installation & First Run

**Files to read:** `scripts/setup-dev.sh`, `scripts/install.sh`, `docker-compose.yml`, `Dockerfile`, `pyproject.toml`, `.env.example`

Walk through:
- What you need: Python 3.11+, Docker, a Linux host (or Mac for dev)
- **Quick start**: `docker compose --profile tls up -d` gets you Core + Gateway + PostgreSQL
- **Dev setup**: `scripts/setup-dev.sh` for local development
- **Production install**: `scripts/install.sh` (curl | bash)
- After startup, open the CLI: `ethernull` → you're in the interactive shell
- Or launch the TUI: `ethernull tui` for the full graphical terminal interface

Include a "you should see this" screenshot/output for each step so readers know they did it right.

### 1.2 Deploying Your First Agent

**Files to read:** `cli/commands/enroll.py`, `cli/commands/pki.py`, `cli/provisioner.py`

Walk through the full flow an operator would follow:
1. Generate certificates: `pki init` then `pki enroll my-server`
2. Deploy an agent: `enroll 192.168.1.50 --user root --key ~/.ssh/id_rsa`
3. Verify it's alive: `agents` shows the new agent with status ALIVE
4. What just happened behind the scenes (briefly: code bundled, SCP'd, systemd service created)

Cover batch enrollment (`enroll --file inventory.txt`) and the test container (`docker compose --profile target up -d target`).

### 1.3 Monitoring Your Fleet

**Files to read:** `cli/commands/agents.py`, `cli/commands/metrics.py`, `cli/commands/events.py`, `cli/commands/alerts.py`, `cli/commands/logs.py`

Day-to-day monitoring commands:
- `agents` — see all agents, their status, last heartbeat
- `metrics <agent>` — live CPU, memory, disk, network gauges
- `metrics fleet` — fleet-wide resource overview, hotspot detection
- `metrics <agent> --watch` — real-time updating display
- `events` — recent security events from all agents
- `alerts` — triggered alerts with severity, status, and source
- `logs <agent>` — real-time agent log stream
- `incidents` — grouped attack timelines

Explain what each severity level means in practice. Give examples: "If you see a `brute_force_escalation` alert, it means X. Here's what to do."

### 1.4 Service Inventory & Vulnerability Management

**Files to read:** `cli/commands/inventory.py`, `agent/collector/package_collector.py`, `core/agent_inventory_store.py`, `core/feed_parsers.py`

Agents automatically inventory their host every 5 minutes: installed packages (with versions), running services, and listening ports. This data powers vulnerability matching.

Commands:
- `inventory` — fleet-wide summary (packages, services per agent)
- `inventory <agent>` — full detail: every package, service, and listener on that host
- `inventory search apache2` — which agents have Apache installed, and what version?
- `inventory service sshd` — which agents are running SSH?
- `inventory vulns` — match all known CVEs against your fleet's actual software

**CVE feed workflow:**
1. Add a CVE feed: `feeds add nvd cve https://...`
2. Feed scheduler automatically pulls and parses CVE data
3. Run `inventory vulns` — see which agents are running vulnerable versions
4. Or let Consciousness do it automatically: when new CVE indicators arrive, it checks the fleet, flags affected hosts, and can even launch Red Phantom to test exploitability

Explain the supported CVE feed formats: NVD JSON API, simple JSON, and CSV.

### 1.5 Talking to the Brain

**Files to read:** `cli/commands/brain.py`, `cli/brain.py`

The Brain is an LLM that has full access to your security data. Enter brain mode:

```
ethernull> brain
brain> what's the security posture of my fleet right now?
brain> which agents have the highest risk scores and why?
brain> search for apache2 across all agents
brain> check if any agents are vulnerable to recent CVEs
brain> start a red team campaign against agent-3
```

The Brain has 90+ tools — it can query agents, search packages, run audits, manage escalation, check risk scores, execute red team attacks, and more. It uses live context injection so it always knows the current state of your fleet.

Three LLM providers: Anthropic Claude, Google Gemini, or Ollama for fully local/private operation.

### 1.6 Security Audits

**Files to read:** `cli/commands/audit.py`, `core/audit_schedule_store.py`

Run security scans on your agents:
- `audit <agent> lynis` — run a Lynis audit
- `audit <agent> rkhunter` — rootkit check
- `audit <agent> nmap` — network scan
- `audit schedule create <agent> lynis --interval 7d` — recurring weekly audit
- `audit schedule list` — see all schedules

Available audit methods: lynis, rkhunter, chkrootkit, ssh_audit, nmap, trivy.

### 1.7 Red Phantom (AI Red Team)

**Files to read:** `cli/commands/phantom.py`, `core/phantom.py`, `deploy/red-phantom/phantom_agent.py`, `deploy/red-phantom/Dockerfile`

Red Phantom is an AI-driven red team. It runs a Kali Linux container loaded with penetration testing tools (nmap, hydra, nikto, gobuster, sqlmap, metasploit, wordlists) and lets the Brain autonomously plan and execute attack campaigns against your own fleet.

**Starting Phantom:**
```bash
# Set a secret (required — Phantom won't work without it)
export PHANTOM_SECRET=your-secret-here

# Internal only (can attack Docker network)
docker compose --profile phantom up -d

# External capability (can attack hosts outside Docker)
docker compose --profile phantom-external up -d
```

**Using Phantom from CLI:**
- `phantom exec nmap -sV 172.18.0.5` — run any command on the Kali container
- `phantom campaign start agent-3,agent-7 --objective "test SSH hardening"` — start an AI campaign
- `phantom campaign` — list campaigns
- `phantom campaign <id>` — see rounds, findings, and security report
- `phantom kill` — emergency stop all Phantom activity

**How AI campaigns work:**
1. Brain starts a campaign targeting specific agents
2. Brain plans attack strategy (reconnaissance, exploitation, pivoting)
3. Brain executes commands on Kali via `phantom exec`
4. After each round, Brain checks what the hive detected (`phantom query hive`)
5. Brain logs findings, adjusts strategy, continues
6. Brain completes campaign with a security report: what worked, what was detected, what gaps exist

**Phantom from Brain mode:**
```
brain> run a red team campaign against agent-3, focus on web application vulnerabilities
brain> check what phantom found in the last campaign
brain> execute a port scan against 192.168.1.50 using phantom
```

**Consciousness integration:** When Consciousness is in autonomous mode, it can independently decide to run Phantom campaigns — for example, after hardening changes or when it notices detection gaps.

### 1.8 Threat Intel Feeds

**Files to read:** `cli/commands/feeds.py`, `core/feed_store.py`, `core/feed_parsers.py`, `core/feed_scheduler.py`

Ingest external threat intelligence:
- `feeds add feodo-c2 feodo https://feodotracker.abuse.ch/...` — abuse.ch Feodo C2 IPs
- `feeds add urlhaus urlhaus https://urlhaus.abuse.ch/...` — malicious URLs
- `feeds add threatfox threatfox https://threatfox-api.abuse.ch/...` — mixed IOCs
- `feeds add otx-pulse otx https://otx.alienvault.com/...` — AlienVault OTX
- `feeds add my-cves cve https://your-cve-feed.example.com/...` — CVE feed (NVD JSON, simple JSON, or CSV)
- `feeds list` — see all configured feeds
- `feeds delete <name>` — remove a feed

Feeds are fetched automatically on configurable intervals. Indicators are deduplicated via Threat Memory. CVE indicators are matched against fleet inventories.

### 1.9 Escalation & Response

**Files to read:** `cli/commands/escalation.py`, `core/graduated_response.py`

Ethernull responds to threats with a 5-tier escalation system:

| Tier | Name | What it does |
|------|------|-------------|
| 1 | OBSERVE | Log the event, watch for more |
| 2 | WARN | Notify the operator |
| 3 | RESTRICT | Block suspicious IPs, limit access |
| 4 | ISOLATE | Network-isolate the agent |
| 5 | KILL | Terminate processes (requires explicit force) |

Escalation happens automatically: repeated events from the same source push the tier up. Risk scores above thresholds also trigger escalation. Tiers cool down over time if the threat subsides.

Commands:
- `escalation` — see all current escalation states
- `escalation <agent>` — agent's current tier and history
- `escalation lock <agent> <tier>` — manually lock an agent at a tier
- `escalation reset <agent>` — reset to OBSERVE

### 1.10 Self-Healing

**Files to read:** `cli/commands/heal.py`, `core/heal_scheduler.py`, `cli/heal_daemon.py`

When an agent goes DEAD, Core automatically creates a heal request. The heal daemon (running on your operator machine) picks it up and tries to recover via SSH:

1. First attempt: restart the systemd service
2. Second attempt: redeploy the agent code
3. Third attempt: full re-enrollment

Commands:
- `heal` — list heal requests and their status
- `heal daemon` — start the heal daemon (runs in foreground)

The system has anti-loop protection: max 3 attempts per episode, cooldown between tries, and auto-cancellation when an agent comes back alive on its own.

### 1.11 Risk Scores & Attacker Profiles

**Files to read:** `cli/commands/risk.py`, `cli/commands/profiles.py`, `cli/commands/chains.py`

- `risk` — fleet-wide risk scores (0-100 per agent)
- `risk <agent>` — detailed breakdown of an agent's risk factors
- `profiles` — known attacker profiles with MITRE ATT&CK mapping
- `profiles <id>` — attacker detail: IPs, techniques, kill chain progress
- `chains` — active multi-stage attack chains being tracked

### 1.12 Notifications

**Files to read:** `core/notifier.py`, `core/telegram_bot.py`

Get alerts on your phone or in your tools:
- **Webhook**: Point alerts at any URL (Slack, PagerDuty, custom)
- **Telegram**: Real-time alert notifications + 2-way conversation with the Brain

Set up via environment variables:
```
ETHERNULL_WEBHOOK_URL=https://hooks.slack.com/...
ETHERNULL_TELEGRAM_BOT_TOKEN=your-bot-token
ETHERNULL_TELEGRAM_CHAT_ID=your-chat-id
```

### 1.13 Consciousness (Autonomous Mode)

**Files to read:** `core/consciousness.py`, `cli/commands/thoughts.py`, `core/thought_store.py`

Consciousness is the Brain running on autopilot. When enabled, it:
- **Reacts** to alerts as they arrive (triages, assesses severity, recommends actions)
- **Proactively** reviews fleet state every 5 minutes (checks for drift, anomalies, gaps)
- **Writes shift reports** every hour (summary of what happened, what's concerning)
- **Checks CVE vulnerabilities** against fleet inventory when new CVE indicators arrive
- **Runs Red Phantom campaigns** when it detects coverage gaps

Two modes:
- **Advisory** (default): Consciousness observes and writes thoughts, but doesn't take action. Operator reviews via `thoughts` command.
- **Autonomous**: Consciousness can acknowledge alerts, escalate agents, create policies, add indicators, run Phantom campaigns, and check fleet vulnerabilities — all on its own.

Commands:
- `thoughts` — see what Consciousness has been thinking
- `thoughts <id>` — full detail on a specific thought

### 1.14 The TUI

**Files to read:** `cli/tui/app.py`, `cli/tui/screens/`, `cli/tui/widgets/`

Launch with `ethernull tui` for a full terminal dashboard. Tokyo Night theme (dark purple/blue).

**7 screens** — press number keys to switch:
1. **Brain**: Chat with the LLM + live activity log
2. **Dashboard**: Agent fleet overview
3. **Alerts**: Alert table with severity colors, acknowledge (a) and resolve (R)
4. **Events**: Live event stream
5. **Incidents**: Attack timelines
6. **Thoughts**: Consciousness analysis feed
7. **Health**: System vitals, fleet metrics gauges, live Core logs

Keys: `1-7` switch screens, `R` refresh, `Ctrl+Q` quit.

---

## Part 2: Reference

Deep dives for when operators need to understand internals, extend the system, or debug issues. Each section should explain the subsystem's design, not just list code — explain *why* it works the way it does.

### 2.1 Architecture Overview

**Files to read:** `core/server.py` (lifespan), `shared/protocol.py`, `gateway/relay.py`, `agent/entrance.py`, `agent/connection.py`

Document with diagrams:
- Three-tier architecture: Agent <-> Gateway <-> Core
- Message flow over WebSocket (REGISTER, HEARTBEAT, EVENT, COMMAND, etc.)
- Command types: ANALYZE, HEAL, COLLECT, CONFIGURE, ISOLATE, ROTATE, QUARANTINE, REPORT, UPGRADE, AUDIT, PHANTOM, EXEC
- Data flow: Event -> baseline learning -> correlation -> alert -> incident -> consciousness -> graduated response
- Startup order from the lifespan function

### 2.2 Detection Engine

**Files to read:** `core/correlation.py`, `core/baseline.py`, `core/chain_detector.py`

- 12 correlation rules (document each: trigger conditions, thresholds, windows, auto-response)
- Baseline engine: Welford's algorithm for online mean/variance, event baselines (50 samples, 1h maturity) and metrics baselines (100 samples, 2h maturity), z-score threshold 3.0
- Chain detector: 7 multi-stage attack definitions, IP-based attacker matching, severity escalation

### 2.3 Agent Internals

**Files to read:** `agent/entrance.py`, `agent/connection.py`, `agent/system_info.py`, `agent/executor.py`, `agent/collector/` (all), `agent/log_forwarder.py`

- Agent lifecycle: start -> register -> heartbeat loop -> event collection -> command execution
- Identity resolution: AGENT_IDENTITY env -> mTLS cert -> `/etc/ethernull/agent-id`
- 5 Collectors:
  - **Auth**: login events from journalctl
  - **Network**: listening ports, connections, port scan detection
  - **Process**: running processes, suspicious paths, deleted binaries
  - **FIM**: file integrity monitoring via inotify/watchdog (SHA-256 baselines)
  - **Package**: installed packages, running services, listening ports (every 5min, change detection)
- Metrics collection: pure /proc-based (CPU, memory, disk, network, processes), piggybacked on heartbeat
- EXEC safety: 9-layer defense, 130+ blocked binaries, trusted paths, rate limiting
- Log forwarding: real-time log streaming to Core

### 2.4 Core Server & API

**Files to read:** `core/server.py`, `core/auth.py`, `core/database.py`, `core/models/tables.py`

- FastAPI server on port 8000
- Authentication: CORE_SECRET (CLI -> Core), HIVE_SECRET (agent registration), mTLS (agent <-> gateway)
- PostgreSQL 16 with async SQLAlchemy, 27 tables, Alembic migrations (sync engine to avoid event loop conflicts)
- Full REST API reference (group by domain, include method, path, params, response shape, curl examples)

### 2.5 Intelligence Layer

**Files to read:** `core/incident.py`, `core/profiler.py`, `core/risk_engine.py`, `core/threat_memory.py`

- Incident engine: auto-groups related alerts into attack timelines
- Attacker profiler: MITRE ATT&CK mapping, kill chain tracking
- Risk engine: 8 weighted factors, per-agent and fleet scores, background computation
- Threat memory: indicator store with TTL, dedup, hit counting

### 2.6 Service Inventory & CVE Pipeline

**Files to read:** `agent/collector/package_collector.py`, `core/agent_inventory_store.py`, `core/feed_parsers.py` (parse_cve), `core/models/indicators.py`

- PackageCollector: auto-detects package manager (dpkg/rpm/pacman/apk), collects packages + services (systemctl) + listeners (ss), baseline tracking with change events, full re-inventory every 30min
- AgentInventoryStore: in-memory latest + PostgreSQL upsert, search by package/service, version comparison for vulnerability matching
- CVE parser: supports NVD API JSON, simple JSON list, and CSV formats
- Vulnerability matching flow: CVE indicator -> extract affected packages -> compare against fleet inventories -> report vulnerable agents with installed vs. fixed versions

### 2.7 Red Phantom Architecture

**Files to read:** `deploy/red-phantom/phantom_agent.py`, `deploy/red-phantom/Dockerfile`, `core/phantom.py`

- Kali Linux container with full pentest toolkit (nmap, hydra, nikto, gobuster, sqlmap, dirb, enum4linux, metasploit, wordlists)
- PHANTOM_SECRET authentication (fail-closed: no secret = 503, not open)
- `/exec` endpoint: arbitrary command execution with timeout, output truncation
- Campaign model: PhantomCampaignRow with JSONB rounds list, target agents/hosts, objective, findings, report
- Hive detection state query: correlates alerts, chains, and commands during a campaign window for gap analysis
- Two Docker profiles: `phantom` (internal network only) and `phantom-external` (dual network for attacking external/LAN targets)

### 2.8 Policy Engine

**Files to read:** `core/policy_engine.py`, `core/policy_brain.py`

- 9 condition types, declarative policies, background evaluation
- PolicyBrain auto-generates policies from alerts, audit findings, phantom gaps

### 2.9 Gateway

**Files to read:** `gateway/relay.py`

- WebSocket relay on port 9000, mTLS CN validation on REGISTER, stateless otherwise
- Plain (dev) and TLS (production) profiles

### 2.10 PKI & Certificate Management

**Files to read:** `shared/pki.py`, `cli/commands/pki.py`

- Hive CA signs gateway + agent certs (RSA 4096, SHA256)
- Auto-deployed during enrollment, agent connection auto-upgrades to wss://

### 2.11 Self-Diagnostics

**Files to read:** `core/diagnostics.py`

- Log ring buffer, DB health checks, schema inspector, resource monitor, connectivity checker

### 2.12 Configuration Reference

**Files to read:** `shared/config.py`, `.env.example`

Comprehensive table of all environment variables with type, default, and description. Group by category:
- Core server (CORE_SECRET, DATABASE_URL, ports)
- Agent (HIVE_SECRET, AGENT_IDENTITY, cert paths)
- Brain/LLM (provider, model, API keys)
- Notifications (webhook URL, Telegram token/chat ID, severity filter)
- Consciousness (enabled, mode, intervals, rate limits)
- Phantom (PHANTOM_SECRET)
- All others from `shared/config.py`

### 2.13 Full API Reference

**Files to read:** `core/server.py`, `cli/client.py`

Every REST endpoint with method, path, auth requirement, request/response shape, and curl example. Group by domain:
Health, Agents, Events, Alerts, Incidents, Commands, Indicators, Baselines, Policies, Audits, Risk, Escalation, Feeds, Healing, Consciousness, Diagnostics, Metrics, Logs, Inventory, Phantom, Telegram, Notifications

---

## Writing Guidelines

**Tone:**
- Write for security engineers and sysadmins who know Linux
- Clear, direct prose — no marketing speak, no unnecessary jargon
- The User Guide should feel like a senior colleague walking you through the system
- The Reference should be thorough but readable — explain design decisions, not just list code
- Use Ethernull terminology naturally: "hive" (the system), "brain" (Core/LLM), "consciousness" (autonomous LLM layer), "hive entrance" (agent)

**Formatting:**
- Include real command examples and expected output throughout the User Guide
- Architecture diagrams with Mermaid
- API docs with curl examples
- Configuration tables: env var, type, default, description
- Every CLI command should have at least one usage example with sample output

**What NOT to do:**
- Don't dump function signatures or class hierarchies — that's a code reference, not documentation
- Don't explain asyncio internals, SQLAlchemy patterns, or Python implementation details unless they affect how operators use the system
- Don't list every field of every database table — only document what operators interact with
- Don't write walls of text — use examples, tables, and diagrams to break things up

## Tech Stack

Use a modern static site generator (Docusaurus, MkDocs Material, Astro, etc). Dark cybersecurity aesthetic — Tokyo Night color palette (#1a1b26 background, #7aa2f7 blue, #bb9af7 purple, #9ece6a green, #f7768e red).

---

## Source Files Quick Reference

| Area | Key Files |
|------|-----------|
| Core server | `core/server.py` |
| Database models | `core/models/tables.py` (27 tables) |
| Wire protocol | `shared/protocol.py` |
| CLI commands | `cli/commands/` (one file per command group) |
| Brain tools | `cli/brain.py` (90+ tools) |
| TUI | `cli/tui/` |
| Agent | `agent/entrance.py`, `agent/collector/`, `agent/executor.py` |
| Gateway | `gateway/relay.py` |
| Detection | `core/correlation.py`, `core/baseline.py`, `core/chain_detector.py` |
| Inventory | `agent/collector/package_collector.py`, `core/agent_inventory_store.py` |
| CVE feeds | `core/feed_parsers.py` (parse_cve), `core/models/indicators.py` |
| Phantom | `deploy/red-phantom/`, `core/phantom.py` |
| Consciousness | `core/consciousness.py`, `core/thought_store.py` |
| Config | `shared/config.py`, `.env.example`, `docker-compose.yml` |
| Migrations | `alembic/versions/` (23 migrations) |
