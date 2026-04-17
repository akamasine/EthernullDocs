# 2.11 Self-Diagnostics

Ensuring the entire telemetry pipeline remains active requires more than just checking web sockets. Ethernull embeds deep execution checking mapped under `core/diagnostics.py`.

## Subsystem Health
Rather than relying purely on external metrics scraping, the Diagnostics module forces self-awareness throughout the Hive architecture.

1. **Connectivity Checker**: Probes internal networking routes natively ensuring Redis/PostgreSQL latency bounds haven't spiked beyond functional reliability.
2. **Resource Monior**: Polls its own Python instance boundaries, checking max-heap consumption limits implicitly to detect long-running memory leaks in the primary Event Correlation Loop.
3. **Log Ring Buffer**: Ethernull tracks recent severe internal application exceptions in a decoupled ring-buffer logic array, allowing operators to ask the Brain exactly what application stack trace crashed without having to pull localized container logs manually.
4. **Schema Inspector**: Maps directly across Alembic database structures at runtime to guarantee database migrations didn't disconnect structural references across restarts seamlessly.
