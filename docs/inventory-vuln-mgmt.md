# 1.4 Service Inventory & Vulnerability Management

Ethernull does not just look for active malware; it maintains a real-time structural map of the software actually running on your endpoints.

Every 5 minutes, agents automatically inventory their host environment, tracking:
- **Installed Packages** (with accurate version specifications mapping back to dpkg/rpm/apk/pacman)
- **Running Services** (tracking `systemctl` daemons)
- **Listening Ports** (mapping raw `ss` listening sockets perfectly back to the owning process)

## Querying Inventories

To see a macro summary counting the total packages and services installed on every enrolled node:
```bash
ethernull> inventory
```

To dive deep into exactly what is installed on a specific instance:
```bash
ethernull> inventory web-srv-01
```

### Fleet-Wide Searching
The actual power of the inventory engine is treating your fleet as a searchable database.

If a new vulnerability drops for a specific application, you can blanket-search your entire infrastructure instantly:
```bash
ethernull> inventory search apache2
# Output: web-srv-01 apache2 2.4.41-4ubuntu3.14

ethernull> inventory service sshd
# Output: web-srv-01 sshd
```

## Vulnerability Matches (CVE)
Instead of searching manually, Ethernull can automatically match known CVEs against your baseline inventory.

After you've successfully configured your Threat Intel Feeds to pull CVEs (see section 1.8), you can trigger the correlation engine:

```bash
ethernull> inventory vulns
```

This commands the Core to evaluate every CVE, extract the affected software packages, and directly cross-reference your agents' reported software lists. 

**Vulnerable agents will be flagged immediately with the exact affected package alongside the fixed resolution string:**
```bash
[WARNING] 2 vulnerable package(s) across fleet (14 CVE(s) checked)
  CVE-2023-XXXX  web-srv-01  linux-image-generic 5.15.0-101 → 5.15.0-102
```

### Autonomous Validation
If Autonomous Consciousness is enabled, Ethernull will automatically check your fleet whenever a new CVE indicator enters Threat Memory. If it detects a vulnerable version on an agent, the Brain will independently flag the host and can autonomously trigger a `Red Phantom` campaign to test exploitability!
