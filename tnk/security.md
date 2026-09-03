# Security

## Threat model

Agent frameworks run with broad host privileges. Typical failure paths include:

- compromised package install scripts
- malicious transitive dependencies
- prompt-induced shell execution of unsafe commands
- over-broad filesystem reads leaking credentials or private keys

tnk limits failures to the sandbox VM.

## What tnk mitigates

### Host exposure

- agent runtimes run inside Lima VM sandboxes, not on the host shell
- project-only mounts prevent full-home access via virtiofs
- runtime variables are explicit, not ambient

### Supply-chain containment

Profiles install package ecosystems inside sandbox boundaries. A bad package impacts the sandbox first, not your host.

### Predictable teardown

`tnk shutdown` and lifecycle subcommands stop all managed sandboxes.

### Scriptability and verification

JSON/NDJSON output and a deterministic command shape let operators implement policy checks in shell tooling.

### Residual risk

tnk does not make agents safe by default. The following actions create attack surface:

- Mounting sensitive files (private keys, `.env` files) into a sandbox
- Executing untrusted binaries manually inside a sandbox
- Overriding safe defaults (`workspace_root`)
- Running sandboxes with elevated privileges

Use `--audit-log` for any session where you need a record of what happened inside the sandbox.

## Sandbox isolation

tnk provides Lima VM-backed isolation using Apple Virtualization framework (`vz`). Each sandbox runs as a separate VM with its own filesystem namespace and mount boundaries. virtiofs mounts provide project-level filesystem access without exposing the host filesystem.

## Recommended secure operating pattern

1. Keep `workspace_root` scoped to `~/code` (never `$HOME`).
2. Run agents through `tnk sandbox shell --profile pi`.
3. Keep host secrets outside project directories.
4. Use `tnk doctor` before major runtime changes.
5. Use `--audit-log` for sensitive sessions.
6. Use `tnk shutdown` when done.

## Limits

tnk contains agent execution. It cannot inspect agent reasoning, validate generated code for logic errors, or prevent social engineering inside the sandbox. Agents with valid credentials can still exfiltrate data through allowed network paths. Use `--audit-log` and least-privilege provisioning to mitigate.

---

**See also:** [Concepts](/tnk/concepts) · [Sandboxing](/tnk/sandbox) · [Configuration](/tnk/configuration)
