# 1.9 Escalation & Response

Ethernull natively limits manual intervention by implementing a sequential Escalation paradigm. Rather than permanently firewalling a system based on an anomaly, operators can observe an agent gracefully step up bounds of restriction as hostility increases.

## The 5 Escalation Tiers

| Tier | Name | Description |
|------|------|-------------|
| 1 | **OBSERVE** | Standard posture. Events are logged, behaviors matched, no active blocking. |
| 2 | **WARN** | High alert thresholds breached. Notifies operators via defined channels. |
| 3 | **RESTRICT** | Rate-limiting enforced. The Agent drops suspicious incoming IPs from local connectivity. |
| 4 | **ISOLATE** | The endpoint completely severes external traffic barring the `mTLS` port allowing it to report to Core. |
| 5 | **KILL** | Autonomous enforcement destroys the offending localized process memory. (Requires explicit force logic to bypass protections). |

## Viewing Auto-Escalations
Escalation happens organically: if a single IP consistently brute forces SSH, the Host steps up to `RESTRICT`. If an attacker pivots internally opening multiple shells, the Risk scores peak mapping straight to `ISOLATE`. Over time, if no further events trigger, the Node automatically scales down gracefully.

To view the current states of your hosts:
```bash
# View fleet thresholds
ethernull> escalation

# View a pinpointed history map
ethernull> escalation web-srv-01
```

## Manual Enforcement
If an operator identifies a threat faster than the ML layer, they can forcefully step in:
```bash
# Force the system to lock out the host
ethernull> escalation lock web-srv-01 ISOLATE

# Return the agent structure manually back to standard baseline
ethernull> escalation reset web-srv-01
```
