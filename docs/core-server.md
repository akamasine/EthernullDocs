# Core Server

The **Ethernull Hive Core** is the central nervous system of the platform. It handles the ingestion of events, maintenance of behavioral baselines, complex LLM analytics, and dispatching of commands to remote agents.

## Core Process and Connectivity

The Core server runs as a high-performance **FastAPI server on port 8000**.
It exposes a split architecture: 
- A persistent WebSocket connection specifically for the Gateway relay: `ws://core:8000/ws/gateway`.
- A fully-featured REST API for the Operator CLI and administrative automation scripts.

## Authentication Layers

To ensure strict operational security, access is strictly segmented using token policies defined in `core/auth.py`.

1. **`CORE_SECRET` (Operator REST API)**
   All endpoints under `/api/v1/*` (except for the `/api/v1/health` check) explicitly enforce bearer token authentication. Any client must provide standard HTTP headers:
   `Authorization: Bearer <CORE_SECRET>`

2. **`HIVE_SECRET` (Agent Registration)**
   The Gateway channel authenticates agents registering to the system using the `HIVE_SECRET` defined in the environment.

## Database & Persistence

The engine is backed by a robust transactional data layer utilizing **PostgreSQL 16**. It operates using **async SQLAlchemy + asyncpg** for high-throughput, non-blocking inserts.

### Tables

There are precisely 26 mapped tables tracking all global system state:
- `agents`, `attacker_profiles`, `directives`, `events`, `alerts`
- `indicators`, `baselines`, `audits`, `audit_schedules`
- `phantom_runs`, `feedback`, `tuner_adjustments`, `audit_methods`
- `policies`, `policy_violations`, `incidents`, `risk_scores`
- `attack_chains`, `escalation_states`, `escalation_history`, `heal_requests`
- `threat_feeds`, `brain_thoughts`, `agent_metrics`, `commands` 
*(1 table used for implicit relationships or tracking omitted from core listings).*

### Migrations

Schema evolutions are strictly version-controlled using **Alembic**. The system contains 20 total migrations. Migrations run via standard sync `psycopg2` during boot sequence initialized by the Core's `lifespan` startup to guarantee DB coherency before websockets are opened.

## Integration

For exact command specifications, refer to the [API Reference](/api-reference). 
