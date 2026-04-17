# 2.3 Agent Internals

The Ethernull Agent sits at the edge of the architecture, representing the data-ingestion workhorse for the underlying intelligence layer.

## Lifecycle Execution
Upon startup via `agent/entrance.py`, the binary goes through a sequential initialization:
1. **Startup**: Binds the asynchronous event loop and discovers configuration parameters.
2. **Identity Resolution**: Prioritizes `AGENT_IDENTITY` ENV binding. If omitted, falls back to parsing the `mTLS` SSL cert CN explicitly. Finally caches internally to `/etc/ethernull/agent-id`.
3. **Register**: Shakes hands with the Gateway Proxy.
4. **Heartbeat Loop**: Synchronously emits `alive` envelopes while dynamically pushing out local resource metrics back natively.
5. **Collection & Command Routing**: Hooks all native system collectors asynchronously and spins up a dedicated command-listening executor wrapper for Core execution.

## The 5 Native Collectors
Instead of tracking everything indiscriminately, the agent compartmentalizes logic using explicit collectors:
1. **Network**: Traces all open listening sockets and drops detection sweeps directly matching reflexive port-scanning events.
2. **Process**: Tracks execution sequences targeting specifically malicious behavioral strings, monitoring active binary deletions, and anomaly spawning.
3. **File Integrity Monitoring (FIM)**: Relies explicitly on native OS hooks (`inotify/watchdog`) to calculate `SHA-256` hashing baselines on secured locations (`/etc/shadow`).
4. **Authentication**: Traverses trailing `journalctl` blocks scanning for PAM login/SSH brute force events.
5. **Package**: Periodically (Every 5 minutes) triggers systemctl parsing and dpkg/rpm discovery algorithms, explicitly calculating dependency delta changes.

## Metrics & Logging

Unlike large EDR clients, Ethernull pulls metrics explicitly using pure `/proc` filesystem bindings without heavy user-space translations, directly analyzing CPU, Memory, Disk, and Process threads efficiently and linking them sequentially onto the heartbeat ping. 

The `log_forwarder.py` subsequently runs independently, streaming explicit edge activity out into the network synchronously.

## Executor Safety 
When a Core system issues an automated response (e.g. `ISOLATE`), the command arrives safely inside executor boundaries. Ethernull enforces a strict 9-layer defense module over incoming shells. It strictly forces rate limitations across `execution` bounds, evaluates binaries against an overarching `130+` explicit hard-coded blacklist structure, and verifies commands map identically to trusted path execution blocks preventing simple path manipulation injection exploits.
