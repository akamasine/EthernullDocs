# 2.6 Service Inventory & CVE Pipeline

Ethernull natively correlates runtime artifacts against known threat intelligence without requiring invasive manual scans. This is orchestrated through a pipelined engine crossing the Agent Collectors up into the Core Feed Parsers.

## Agent Package Collection
Inside `agent/collector/package_collector.py`, the agent dynamically polls the environment. 
Unlike static telemetry systems, the Package Collector performs intelligent auto-detection of the host package manager (e.g., `dpkg`, `rpm`, `pacman`, `apk`). 

Every 30 minutes, it forces a complete re-inventory:
1. Pulls all explicitly installed packages.
2. Crosses the `systemctl` bindings to identify enabled daemons.
3. Invokes native socket polling (`ss`) to precisely track open listeners linked to active process IDs.

For performance, it tracks the delta mathematically, firing "change events" rapidly only if a state shifts between the 30-minute macro updates.

## Agent Inventory Store
When these structured inventories hit the Core, `core/agent_inventory_store.py` manages state serialization. To optimize querying, it retains the absolute latest snapshot entirely in-memory while simultaneously wrapping an asynchronous PostgreSQL upsert for durability. 

This store provides exact search capabilities relying on index traversal (e.g. searching across thousands of agents for `openssh-server` natively).

## CVE Feed Parsers
The engine pulls intelligence vectors using `core/feed_parsers.py`.

The CVE Parsing logic encompasses multiple structures:
- **NVD API JSON Framework**: Replicates CVSS scores and exact structural descriptions.
- **Simple JSON Mapping**: Allows custom corporate parsing requirements.
- **CSV Formats**: Fallback logic for legacy feeds.

## The Matching Flow
The true logic resides in the overlap:
1. A **CVE Indicator** lands inside the Feed Store.
2. The Engine translates the CVE description into affected base packages (`libssl` vs `openssl`).
3. It directly diffs the defined vulnerability thresholds (`< 1.1.1u`) explicitly against the `AgentInventoryStore`'s known installed version ranges utilizing `distutils` version comparison mapping.
4. If a match is flagged, an explicit `Vulnerability` event is triggered returning both the `installed_version` and the `fixed_version` directly back to the Intelligence layer operators.
