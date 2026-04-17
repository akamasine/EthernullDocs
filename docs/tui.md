# 1.14 The TUI

Ethernull natively implements a fully-featured, multiplexed Terminal User Interface (TUI) powered by the `textual` framework. Designed to strictly observe a dark cybersecurity Tokyo Night aesthetic, the interface delivers rich visual representations over standard SSH connections.

## Launching

Trigger the interface by appending `--tui` alongside the standard CLI invocation:
```bash
ethernull tui
```

## Screen Maps

The core binding shortcuts let you navigate swiftly across major data structures using the primary digit cluster (1-7). 

- **[1] Brain (`hive`)**: Jump straight into a conversational interface with the LLM Brain, accompanied by a live activity streaming log.
- **[2] Dashboard (`dashboard`)**: An operational fleet overview of connected endpoints and aggregated risk scores.
- **[3] Alerts (`alerts`)**: An interactive table grouping triggered security warnings chronologically. Use `a` to Acknowledge or `R` to Resolve explicitly from the UI.
- **[4] Events (`events`)**: A real-time, unstructured streaming feed representing raw low-level telemetry collectors.
- **[5] Incidents (`incidents`)**: Aggregated attack timelines visually mapping multi-stage sequential chains.
- **[6] Thoughts (`thoughts`)**: An explicit timeline showcasing the underlying reasoning logic outputted by the autonomous *Consciousness* layer.
- **[7] Health (`health`)**: Real-time system vitals, displaying specific container fleet metrics gauges, and live internal Core diagnostics logs.

*(Hitting `R` forces a refresh across any context. Hit `Ctrl+Q` to terminate the UI).*
