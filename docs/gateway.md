# 2.9 Gateway

Due to the nature of distributed deployment boundaries reaching up to thousands of asynchronous systems globally, the Core does not directly handle connection sockets. Instead, Ethernull utilizes a `Gateway` architecture (`gateway/relay.py`).

## Relay Execution
The Gateway primarily acts as a dumb WebSocket funnel bound actively to port `9000`. Its entire focus revolves around scaling parallel inbound WebSocket frames seamlessly and piping the byte boundaries locally down to the Core processor via internal RPC boundaries. This ensures that a massive denial of service or heavy bandwidth push from thousands of agents simultaneously doesn't crash the heavy SQLAlchemy synchronization routines handling events.

## Stateless Validation
The Gateway is fundamentally completely stateless—never storing local state boundaries. The only logical validation that occurs dynamically is explicitly verifying incoming SSL `mTLS` Certificates on initial `REGISTER` envelopes. Upon connection, it maps the parsed `CN` object from the x509 extension natively to the incoming headers to guarantee endpoints cannot spoof identities.

## Profiles
Administrators can dictate two native profiles:
- **`plain`**: Disables TLS logic entirely. Utilized fundamentally in isolated internal testing environments.
- **`tls`**: Boots the explicit TLS context boundaries tracking explicit CA matching requirements enforced unconditionally across production operations.
