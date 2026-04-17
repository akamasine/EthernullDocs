# 1.6 Security Audits

Alongside continuous, lightweight telemetry streaming, operators can explicitly command endpoints to execute demanding security compliance audits directly from the terminal. 

## Executing Core Scans
Ethernull provides standardized wrappers covering several prominent forensic engines (e.g., lynis, chkrootkit, trivy, nmap). To fire a single scan:

```bash
ethernull> audit web-srv-01 lynis
ethernull> audit web-srv-01 rkhunter
ethernull> audit web-srv-01 nmap
```

These scans run decoupled inside the remote agent (with timeouts bound). The Core will notify the event stream upon the scan's completion, automatically pushing the hardening metrics back into the vulnerability databases.

## Scheduled Executions
Instead of manually executing these scans, you can delegate Ethernull to automatically run them chronologically, ensuring endpoints remain compliant over long lifecycles:

```bash
# Create a recurring weekly Lynis hardening audit
ethernull> audit schedule create web-srv-01 lynis --interval 7d

# View all active automated audits across the fleet
ethernull> audit schedule list
```
