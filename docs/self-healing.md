# 1.10 Self-Healing

The entire Hive requires agents to remain constantly active. However, systems crash, attackers modify configurations, and networking drops. When an Agent goes explicitly `DEAD` (missing contiguous heartbeat thresholds), Ethernull falls back on an entirely distinct out-of-band communication mesh: **Self-Healing SSH**.

## The Process
Because the Operator machine originally deployed the Agent using `~/.ssh` identities, it maintains the rights to intervene.

If Core cannot reach the endpoint, it outputs a *Heal Request*. 

The operator machine catches this explicitly, bypassing the main TLS proxy loop and attempts:
1. **First Attempt:** Forcefully triggering a `systemctl restart` on the background `ethernull-agent` service daemon.
2. **Second Attempt:** Connecting via SCP to entirely wipe and redeploy the Agent code bundle, clearing any local malicious source mutations.
3. **Third Attempt:** Forcing a pure re-enrollment utilizing the provisioner.

*Note: The platform features strict anti-loop protection (Max 3 attempts per episode) protecting against endless deployment polling.*

## Running the Daemon
In order to actually trigger healing requests from the Core down into your local SSH config layer, you must explicitly run the foreground daemon in your management terminal:

```bash
ethernull> heal daemon
```

To list exactly what the daemon tracked regarding previous crash occurrences and auto-healing successes:
```bash
ethernull> heal
```
