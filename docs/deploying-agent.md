# 1.2 Deploying Your First Agent

Once the Hive Core is running, it expects data. You achieve this by deploying **Agents** to your endpoint targets. Ethernull bypasses complicated CI/CD pipelines—operators push agents directly from their terminal using native SSH connections.

## The Deployment Flow

Ethernull runs securely over an `mTLS` infrastructure. This means before shipping the agent code, you explicitly generate identity certificates natively inside the Hive. 

### 1. Generate Certificates
First, establish the Hive Certificate Authority (CA) if you haven't already:
```bash
ethernull> pki init
```

Next, sign a dedicated certificate identifying the target server (e.g., `web-srv-01`):
```bash
ethernull> pki enroll web-srv-01

# Output:
# generating certificate for web-srv-01...
# agent cert: ...
```

### 2. Deploy The Agent
Using the CLI interface, you command Ethernull's provisioner to automatically cross over SSH, install the background daemons, attach the generated TLS keys, and start the service asynchronously:

```bash
ethernull> enroll 192.168.1.50 --user root --key ~/.ssh/id_rsa
```

**What just happened behind the scenes?**
1. Ethernull creates a compact tarball of its agent engine.
2. It SSH's into the endpoint to test connectivity.
3. It bundles the agent package alongside the `.crt` & `.key` identities and pushes them to `/opt/ethernull`.
4. It dynamically wires up `/etc/systemd/system/ethernull-agent.service` and executes the daemon.
5. Finally, the remote Agent wakes up and successfully handshakes back to the Core Gateway over `wss://`.

### 3. Verify Connectivity
Confirm the node properly signaled back to the operator dashboard:
```bash
ethernull> agents

# Output:
# [ALIVE]   web-srv-01    192.168.1.50
```

## Batch Operations and Target Testing
You don't need to push agents sequentially. If you maintain `.txt` or `.csv` infrastructures, you can push fleet-wide deployments simultaneously:
```bash
ethernull> enroll --file inventory.txt
```

*(For testing without deploying against real hardware, use our built-in dummy target module configuration: `docker compose --profile target up -d target`)*
