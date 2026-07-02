# Security

## Threat model summary

Agent frameworks are powerful and risky when run on a host with broad privileges. Typical failure paths include:

- compromised package install scripts
- malicious transitive dependencies
- prompt-induced shell execution of unsafe commands
- over-broad filesystem reads leaking credentials or private keys

muthr's posture is to reduce blast radius by default.

## What muthr mitigates

### Host exposure reduction

- agent runtime executes inside sandbox container, not host shell
- project-only mount model avoids full-home exposure
- runtime integration variables are explicit, not ambient

### Supply-chain containment

Profiles (opencode/hermes) install package ecosystems inside container boundaries. A bad package then impacts the sandbox environment first, not your host root.

### Predictable teardown

`muthr shutdown` and lifecycle subcommands make it straightforward to stop and reset all managed components.

### Scriptability and verification

JSON/NDJSON output and deterministic command shape let operators implement policy checks in shell tooling.

## Apple container backend advantages

muthr uses [Apple container](https://github.com/apple/container) tooling rather than ad-hoc chroot/shell wrappers. This gives a native virtualization-backed isolation boundary with explicit container lifecycle primitives (`create`, `start`, `exec`, `stop`, `delete`) and network controls.

For local AI operators, this is a practical sweet spot:

- strong isolation characteristics
- low-friction CLI control
- native Apple Silicon compatibility

## Recommended secure operating pattern

1. Keep `workspace_root` scoped to `~/src` (never `$HOME`).
2. Run agents through `muthr sandbox shell --profile ...`.
3. Keep host secrets outside project directories.
4. Use `muthr doctor` before major runtime changes.
5. Use `--audit-log` for sensitive sessions.
6. Use `muthr shutdown --yes` when done.

## Limits and honesty

muthr improves safety posture, but it is not a magic guarantee. If you mount sensitive files into a sandbox, execute untrusted binaries manually, or override safe defaults, you can still create risk. The design goal is strong defaults plus explicit control.
