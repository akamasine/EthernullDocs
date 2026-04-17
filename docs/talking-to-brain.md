# 1.5 Talking to the Brain

Ethernull isn't just a static rules engine. At its core lives the **Brain**—an LLM integration that possesses complete runtime access to your security data. It doesn't just read your logs; it has access to 90+ tools allowing it to dynamically execute queries, manage escalations, or evaluate active alerts.

## Entering Brain Mode

You can drop into a direct conversational interface with the intelligence layer directly via the CLI:

```bash
ethernull> brain

# The prompt shifts to the Brain Context
brain> _
```

## Conversing
The Brain is mapped to your exact environment. You can ask it to perform deep context aggregations that would otherwise take security analysts hours to parse manually:

```bash
brain> what's the security posture of my fleet right now?
brain> which agents have the highest risk scores and why?
brain> search for apache2 across all agents
brain> check if any agents are vulnerable to recent CVEs
brain> start a red team campaign against target-1
```

## Providers
Ethernull operates using live context injection. As you converse, the backing LLM provider invokes tool-calls locally to scrape PostgreSQL and evaluate the response. 

To power the Brain, you must configure a native provider within your `.env`. Ethernull currently supports three leading LLM layers depending on your privacy requirements:
1. **Anthropic Claude** (`CLAUDE_API_KEY`)
2. **Google Gemini** (`GEMINI_API_KEY`)
3. **Ollama** (Fully disconnected/air-gapped local execution)
