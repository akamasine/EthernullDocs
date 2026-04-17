# Notifications

The true value of a security platform lies in fast incident relay. Ethernull bypasses clunky email infrastructures through a dedicated real-time Notification framework (`core/notifier.py`).

## Core Configuration

The messaging loop relies on global environment variables for seamless startup. Adjust `.env` to define what triggers push notifications:

```env
ETHERNULL_ALERT_MIN_SEVERITY=high
ETHERNULL_WEBHOOK_TYPE=telegram 
```
*Note: Valid thresholds are `low`, `medium`, `high`, and `critical`.*

## Supported Integrations

### 1. Telegram
Telegram handles Native Markdown rendering, natively unpacking severity emojis, and isolating specific payload indicators properly formatted. You simply inject your credentials alongside the type:
```env
ETHERNULL_TELEGRAM_BOT_TOKEN="your_token"
ETHERNULL_TELEGRAM_CHAT_ID="your_channel"
```

### 2. Generic Webhooks
If `webhook_type` targets a generic endpoint (or remains untouched), Ethernull constructs its payload sequentially into standard JSON. This easily integrates into enterprise routing solutions such as **Slack Notifications**, **Discord**, or **Microsoft Teams Webhooks** utilizing basic proxy middlewares.
```env
ETHERNULL_WEBHOOK_URL="https://example.com/webhook"
```

## Consciousness Integration

Beyond structured alert arrays, the Brain and Consciousness LLM layers retain authorization to invoke `.send_message(text, severity)` independently! Meaning the AI explicitly has a direct communication line to analysts, pushing unstructured plain-text analysis as a human would over chat, keeping the team aware of behavioral subtleties without triggering strict, loud SIEM alerts.
