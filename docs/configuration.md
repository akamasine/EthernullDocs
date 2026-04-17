# Diagnostics & Configuration Reference

Given Ethernull operates in an edge-proxied model, configuration tracking sits entirely in explicit environment variables defined within `.env`. 

## Core Configuration Reference

| Variable | Description |
|---|---|
| `CORE_SECRET` | Mandatory UUID used to authorize REST endpoints and CLI interactions via Bearer Tokens. |
| `GATEWAY_PORT` | Defaults to 8080. Used to bind the multiplexed agent websocket listener. |
| `HIVE_SECRET` | Edge verification phrase optionally used during initial `REGISTER` envelopes. |
| `ETHERNULL_CORE_URL` | Hard override for Operators operating on distinct network segments. |

## Certificates Tracking
The integrity of the mTLS architecture depends strictly on tracking accurate certificate paths. Verify endpoints explicitly define:
- `AGENT_CERT`
- `AGENT_KEY`
- `CA_CERT`

## Edge Diagnostic Logging

If an edge Agent experiences intermittent stalls, operators are encouraged to review the internal Asyncio tasks locally instead of relying on central tracking. Check if the collector pipeline has crashed locally:
```bash
# General Edge Logging Profile
journalctl -u ethernull-agent.service -f

# Fallback explicit debug run
python -m agent.entrance
```

## Health Heartbeats

A baseline server validation check loops through the unauthenticated health endpoint representing overall database connectivity, node presence, and API health.
```bash
curl http://localhost:8000/api/v1/health
```
