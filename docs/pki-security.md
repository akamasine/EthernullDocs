# PKI & Security

Ethernull employs two completely separate authentication models for the two distinct planes of execution: **Operators** and **Agents**. Overlapping models fundamentally increase attack surface, so Ethernull explicitly splits them.

## Token-Based Stateless REST Auth (Operator Plane)

All traffic hitting the **Core REST API** (typically originating from operator CLI tools, continuous integration pipelines, or automated scripts) utilizes simple, stateless Bearer tokens. 

The security validator defined in `core/auth.py` mandates that every single HTTP request (excluding the base `/api/v1/health` pulse) must provide an `Authorization` header populated with the system's `CORE_SECRET`.
This ensures administrative automation acts fast without excessive handshake overhead. 

## mTLS Stateful Websocket Auth (Agent Plane)

Edge telemetry necessitates higher strictness. The `Agent` ↔ `Gateway` interface communicates almost exclusively over persistent WebSockets. 
To thwart spoofing, token stealing, or man-in-the-middle decryption, Ethernull explicitly binds edge agents to the infrastructure mapping using **Mutual TLS (mTLS)**.

### The Certificate Pipeline

If operating in production mode, standing up your infrastructure involves generating a complete Public Key Infrastructure (PKI) layer:

1. **CA Generation:** A central Certificate Authority (`CA_CERT`) is minted solely to govern the Ethernull realm.
2. **Gateway Certificates:** The Gateway proxy requires its own keypair, signed by the CA, to prove its identity to roaming endpoints.
3. **Agent Certificates:** When an agent is provisioned, a local keypair is struck. The certificate generation process injects the specific Agent ID directly into the certificate's **Subject Alternative Name (SAN)**.

### Stateful Handshake Validation

When an Agent WebSocket initiation arrives at the Gateway:
1. The proxy validates the Agent's signature against the trusted root CA.
2. The proxy dynamically extracts the explicit Agent ID directly from the SAN extensions.
3. This cryptographic identity represents the absolute source of truth and is hard-tethered to the network connection, discarding all application-layer claims of identity.
