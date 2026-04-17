# 1.1 Installation & First Run

Ethernull provides a massive enterprise-grade security system compacted into a few scalable commands. The primary command loop consists of the **Core** (data correlation and LLM consciousness), the **Gateway** (the connection proxy), and the **PostgreSQL 16** datastore.

## What You Need
- **Python**: 3.11+
- **Docker & Docker Compose**: For the background PostgreSQL datastore and Gateway. 
- **Operating System**: Linux (production) or macOS (development).

## Quick Start
The fastest way to boot the hive architecture is to stand up the cluster using the built-in Docker configurations:

```bash
docker compose --profile tls up -d
```
This single command instantiates the Core server, the `wss://` mTLS gateway listener, and the structured intelligence database automatically.

## Production Install
If you're deploying Ethernull directly onto an explicit management server (without Dockering the Core itself), use the production curl script:

```bash
curl -sSL https://raw.githubusercontent.com/akamasine/Ethernull/main/scripts/install.sh | bash
```
*Note: This unpacks Ethernull into `~/ethernull`, injects systemd services, and registers the global `ethernull` command.*

## Dev Setup
Security engineers writing custom plugins or pushing core modifications can pull the repo natively and utilize the setup wrapper:

```bash
git clone https://github.com/akamasine/Ethernull.git
cd Ethernull
./scripts/setup-dev.sh
```

## Opening the CLI
Once Ethernull is running, the operator interfaces entirely using the terminal.

To enter the standard interactive shell, invoke:
```bash
ethernull

# Output:
# [OK] Ethernull Core Reachable
# > _
```

To invoke the structured graphical **TUI** (Terminal UI) representing events, alerts, and live LLM interactions:
```bash
ethernull tui
```
