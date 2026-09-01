# tnk (experimental)

tnk is a zero-trust sandbox for local inference and AI agent runtimes. It manages the inference engine on the host and per-project Lima sandboxes with isolated execution environments.

<img src="./assets/index-hero.gif" alt="tnk CLI demo" width="100%" />

tnk follows Unix design principles:

- subcommands grouped by lifecycle domain
- scriptable output (`text`, `json`, `ndjson`)
- explicit defaults you must override intentionally
- safe behavior when context is missing

## Why this exists

Agent stacks execute package installers, shell commands, generated scripts, and network clients with broad filesystem access. A compromised dependency gives an attacker access to your credentials, keys, and system files.

tnk reduces that risk through enforced boundaries:

- run agent execution inside Lima VM sandboxes
- keep host-only assets outside sandbox mounts
- gate runtime context with explicit env contracts
- log every sandbox session for audit and incident review

## Core model

1. **Host inference engine**: managed by `tnk engine`
2. **Per-project sandbox**: Lima VMs for isolated execution, managed by `tnk sandbox`

The default path is `tnk run`: it boots the inference engine, then you enter project sandboxes as needed.

## Read next

1. [Quickstart](/tnk/quickstart)
2. [Commands](/tnk/commands)
3. [Sandbox](/tnk/sandbox)
4. [Security](/tnk/security)
5. [Configuration](/tnk/configuration)

---

**See also:** [Quickstart](/tnk/quickstart) · [Concepts](/tnk/concepts) · [Security](/tnk/security)
