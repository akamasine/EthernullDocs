# Intelligence Layer & Consciousness

The Ethernull architecture operates on dual planes of intelligence: a deterministic memory block and a fluid orchestration engine powered by LLMs.

## Threat Memory (The Cache)

Foundational incident detection is strengthened by `core/threat_memory.py`. When Ethernull detects malicious actions through standard correlation rules or security events, it permanently records the offending indicators (IP addresses, processes, executable hashes) into the database.

- **Incremental Learning:** Instead of blindly storing duplicate entries, Threat Memory bumps internal *hit counts*, raising severity gradually.
- **Auto-Learning Pipelines:** Entities triggering high-severity scenarios, such as `brute_force_campaign` or `deleted_binary`, instantly deposit their identifiers into global tracking.
- **TTL (Time to Live):** Indicators gracefully age out if they lay dormant (typically after 7 days) unless re-triggered, which fundamentally refreshes their timer, ensuring the cache does not become bloated with stale artifacts.

## Intelligence Orchestrator (Consciousness)

Beyond deterministic matching, the Ethernull `Brain` orchestrates unstructured problem solving using **Langchain + the OpenAI standard**. 

### The Decision Cycle
When endpoints submit data that is too convoluted or complex for standard `if/else` correlation, the Brain applies LLM analysis through three structural models:
1. **Thoughts:** The system evaluates raw telemetry data to deduce underlying attacker intent.
2. **Heuristics:** The LLM correlates context against previous threat intelligence.
3. **Directives:** The final LLM output generates explicit instructions (like deploying containment via the Response Engine) which are then dispatched back down the WebSocket.

### Policy Brain Autogeneration
Alongside remote consciousness, the `PolicyBrain` locally acts to autogenerate definitive restrictions out of the blue. If repeated threats bypass manual setup, the Engine automatically enforces new policies against the entire endpoint pool, blocking subnet masks or blacklisting malicious processes dynamically.
