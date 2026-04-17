# Policy Engine

The Ethernull Policy Engine provides the declarative rule structure that governs acceptable node behaviors across the hive mind. 

Operating on a continuous background loop, it evaluates predefined invariants against live agent state, correlation baselines, and events, issuing warnings or pushing direct automated remediation.

## Supported Declarations
Policies can map explicitly to the following behavioral patterns:
- **`max_open_ports`**: Detects if an agent maintains too many listening sockets simultaneously.
- **`forbidden_process` & `required_process`**: Explicitly blacklists execution names or enforces compliance runtimes.
- **`max_auth_failures`**: Imposes thresholds on PAM/SSH negotiation failure vectors.
- **`baseline_deviation`**: Triggers when telemetry shifts more than $N$ sigma from historical norm distributions.
- **`max_listeners`**: Tracks burst-opening TCP streams (e.g. pivoting reverse shells).
- **`block_subnet`**: Broad network isolation policies targeting hostile segments.
- **`min_hardening_score`**: Hooks into the Audit system requiring an arbitrary Lynis/compliance grade.

## The Evaluation Cycle
The Policy Engine is not an event-listener; it runs a parallel periodic evaluation, querying the telemetry structures (Event Store, Baseline Engine) every 120 seconds. 

By operating asynchronously to real-time events, it ensures high sustained throughput across thousands of agents without stalling critical telemetry pipelines. If it flags a system state as violated, it creates a `PolicyViolation` exception and seamlessly routes an automated mandate backward into the `Graduated Response` pipeline.
