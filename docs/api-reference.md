# API Reference

The Ethernull Core exposes a REST API for the Operator CLI and automation. All routes require the `Authorization: Bearer <CORE_SECRET>` header.

## Agents & Provisioning

- `GET /api/v1/agents`  
  *Returns:* List of all connected/known agents.
- `GET /api/v1/agents/{agent_id}`  
  *Returns:* Specific agent details.
- `DELETE /api/v1/agents/{agent_id}`  
  *Returns:* Triggers a self-destruct request for the agent and removes it.

## Directives

- `GET /api/v1/agents/{agent_id}/directives`
- `POST /api/v1/agents/{agent_id}/directives`
- `POST /api/v1/directives/{directive_id}/acknowledge`
- `POST /api/v1/directives/{directive_id}/complete`
- `POST /api/v1/directives/{directive_id}/fail`

## Events & Alerts

- `GET /api/v1/events`  
  *Params:* `limit`, `agent_id`, `severity`, `event_type`  
  *Returns:* Paginated stream of terminal events.
- `GET /api/v1/events/stats`
- `GET /api/v1/alerts`
- `GET /api/v1/alerts/stats`
- `GET /api/v1/alerts/{alert_id}`
- `POST /api/v1/alerts/{alert_id}/acknowledge`
- `POST /api/v1/alerts/{alert_id}/resolve`

## Threat Intelligence (Indicators)

- `GET /api/v1/indicators`
- `POST /api/v1/indicators`
- `GET /api/v1/indicators/stats`
- `GET /api/v1/indicators/check`
- `GET /api/v1/indicators/{indicator_id}`
- `DELETE /api/v1/indicators/{indicator_id}`

## Commands

- `POST /api/v1/command`  
  *Params:* `target` (agent_id), `command_type`, `payload` (JSON)  
  *Returns:* Issues a direct command to an agent.

## Audits & Scheduling

- `POST /api/v1/audits` (Initiate an immediate security audit)
- `GET /api/v1/audits`
- `GET /api/v1/audits/stats`
- `GET /api/v1/audits/{audit_id}`
- `POST /api/v1/audit-schedules`
- `GET /api/v1/audit-schedules`
- `GET /api/v1/audit-schedules/stats`
- `GET /api/v1/audit-schedules/{schedule_id}`
- `POST /api/v1/audit-schedules/{schedule_id}/pause`
- `POST /api/v1/audit-schedules/{schedule_id}/resume`
- `DELETE /api/v1/audit-schedules/{schedule_id}`

## Phantom Orchestrator (Red Team)

- `GET /api/v1/phantom/scenarios`  
  *Returns:* Available attack sequence simulation modules.
- `POST /api/v1/phantom/run`  
  *Returns:* Deploys an attack simulation instance against a target agent.
- `GET /api/v1/phantom/runs`
- `GET /api/v1/phantom/runs/{run_id}`
- `POST /api/v1/phantom/kill`

## Attacker Profiles

- `GET /api/v1/profiles`
- `GET /api/v1/profiles/stats`
- `GET /api/v1/profiles/{profile_id}`
- `POST /api/v1/profiles/{profile_id}/status`
- `GET /api/v1/profiles/by-ip/{ip}`

## Feedback & Correlation

- `GET /api/v1/feedback`
- `GET /api/v1/feedback/stats`
- `GET /api/v1/correlation/stats`

## Baselines

- `GET /api/v1/baselines`
- `GET /api/v1/baselines/stats`
- `GET /api/v1/baselines/{agent_id}`
