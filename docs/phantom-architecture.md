# 2.7 Red Phantom Architecture

Rather than executing theoretical risk calculation logic, Ethernull natively validates correlation and response rulesets using **Red Phantom**—a fully encapsulated autonomous attack simulator.

## Infrastructure Design
Red Phantom operates as a localized Docker array independent of the Core execution context, mapping primarily to `deploy/red-phantom/phantom_agent.py` and its dedicated `Dockerfile`.

It utilizes a heavy Kali Linux base image preloaded with an exhaustive enterprise toolkit: `nmap`, `hydra`, `nikto`, `gobuster`, `sqlmap`, `dirb`, `enum4linux`, `metasploit`, and `wordlists`.

### Network Targeting Profiles
Operators can explicitly bind its operational domain routing via `docker-compose.yml`:
1. **`phantom`**: Binds implicitly to the internal docker network, ensuring simulations remain strictly inside localized development meshes.
2. **`phantom-external`**: Exposes dual networking, allowing the container explicit bridges across standard LAN segments to attack bare-metal agents natively.

## The Agent Communication API
Due to the destructive nature of Kali tooling, the container relies explicitly on a **Fail-Closed** secret environment structure (`PHANTOM_SECRET`). If the `phantom_agent.py` does not possess the correct matching secret, all endpoints strictly return `503 Unavailable`.

If validated, the Brain can interface directly with the `/exec` API—which captures arbitrary hex-encoded command arguments, pipes them into the underlying OS, and restricts overall execution bounded to a strict timeout parameter, wrapping and truncating excessive stdout/stderr safely back into JSON.

## The Campaign Model
When an autonomous sequence begins, `core/phantom.py` instantiates a `PhantomCampaignRow`. This acts as a stateful memory representation tracking the objective loop:

1. **Target Matrix**: Agents / CIDR segments the campaign is allowed to attack.
2. **Objective String**: LLM Prompt (e.g., "Pivot through web-server into SSH array").
3. **Round Execution (JSONB)**: Structured sequence maintaining every command output mapping logically across time.
4. **Final Findings**: The final ML output tracking vulnerabilities explicitly exploited and detection gaps observed.

## Hive State Correlation
Because Ethernull maintains native `Threat Memory`, after executing an attack round (e.g., `hydra ssh blast`), Red Phantom natively invokes the **Hive Detection State Query**. It requests the Central Correlation Engine to pull all explicitly triggered `alerts`, `chains`, and raw `events` during the exact timeframe of its attack round. 

This creates a perfect closed-loop scenario: The attacker directly queries the defender to explicitly audit whether it was observed successfully.
