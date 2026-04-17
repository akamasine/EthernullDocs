# 1.3 Monitoring Your Fleet

Once you've deployed agents across your endpoints, Ethernull immediately starts routing live system metrics and security events back to the Core.

Accessing this data is done through the interactive `ethernull` CLI using real-time polling commands.

## Agent Status

To see your current deployed footprint and their network states:

```bash
ethernull> agents
```
This shows precisely which endpoints are `ALIVE`, which have gone `SILENT` (missing heartbeats), and which are `DEAD`. You can filter these lists using bounds like `agents --silent`.

To investigate why an agent might be offline, probe its detailed status:
```bash
ethernull> status web-srv-01
```

## System Metrics

Ethernull piggybacks pure `/proc` resource monitoring over its security heartbeats, meaning you don't need a secondary agent (like NodeExporter/Datadog) just to check system health. 

### Singular Node Metrics
To pull the latest telemetry snapshot for a specific agent:
```bash
ethernull> metrics web-srv-01
```
This will visually output color-coded gauges for CPU, Load, Memory, Disk, and Network IO.

### Live Watching
To turn your CLI into a live dashboard (refreshing every 10 seconds), utilize the watch flag:
```bash
ethernull> metrics web-srv-01 -w
```
*(Hit `Ctrl+C` to exit watch mode).*

### Fleet Hotspots
To view macro-level statistics and identify which agents are overconsuming resources relative to your fleet:
```bash
ethernull> metrics fleet
```
The output highlights average, max, and min capacities, explicitly flagging anomalous nodes under the **HOTSPOTS** section.

## Security Events & Logging
While metrics track infrastructure hardware, security relies on event parsing:

- `ethernull> events` — Streams a chronological feed of recent security triggers across the entire fleet.
- `ethernull> alerts` — Displays only events that broke minimum correlation thresholds and resulted in actionable warnings.
- `ethernull> incidents` — Groups overlapping alerts into larger multi-stage attack timelines.
- `ethernull> logs web-srv-01` — Taps directly into an agent's internal debug log, streaming it locally for deep troubleshooting.
