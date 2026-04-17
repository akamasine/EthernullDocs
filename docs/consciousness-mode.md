# 1.13 Consciousness (Autonomous Mode)

Ethernull includes an autonomous background loop called **Consciousness**, essentially putting the Intelligence Layer on autopilot.

Instead of waiting for an operator to run `ethernull brain` and type a query, Consciousness operates independently: it reacts to incoming high-severity alerts automatically, it actively sweeps the fleet every 5 minutes looking for behavioral anomalies, and it natively cross-references newly ingested CVEs against the fleet's live Service Inventory array.

## Modes of Operation

You can define how much physical control Consciousness has over your network.
1. **Advisory (Default)**: Consciousness observes your fleet, produces analysis paths, and writes unstructured "thoughts", but executes no physical tools. Operators act as the executor.
2. **Autonomous**: Consciousness is completely unshackled. It can explicitly acknowledge security alerts, elevate Agents to `RESTRICT` or `ISOLATE` automatically, generate persistent declarative security policies, inject threat indicators, and even autonomously orchestrate `Red Phantom` container deployments to validate its own hypotheses.

## Reviewing Thoughts
Because Consciousness runs permanently in the background, you can review its internal monologue by invoking the CLI:

```bash
# View the linear timeline of AI analysis
ethernull> thoughts

# Explore a deeply structured analysis event
ethernull> thoughts <id>
```

Additionally, if Autonomous Mode is enabled, Consciousness writes explicit chronological "Shift Reports" documenting its findings across every hourly interval, behaving fundamentally like a dedicated SOC Analyst.
