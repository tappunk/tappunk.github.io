# tnk (experimental)

tnk manages per-project sandbox VMs for AI agent runtimes. Each project gets its own Lima VM that mounts only the project directory. The inference engine runs on the host and is managed outside of tnk; sandboxes reach it over the Lima virtual network.

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

1. **Host inference engine**: an OpenAI-compatible server you run and own (for example, `llama-server`). tnk never starts, stops, or inspects it.
2. **Per-project sandbox**: a Lima VM for isolated execution, managed by `tnk sandbox`.

The default path is `tnk run`: it boots the project sandbox, then you enter it with `tnk sandbox shell`.

## Read next

1. [Quickstart](/tnk/quickstart)
2. [Commands](/tnk/commands)
3. [Sandboxing](/tnk/sandbox)
4. [Security](/tnk/security)
5. [Configuration](/tnk/configuration)

---

**See also:** [Quickstart](/tnk/quickstart) · [Concepts](/tnk/concepts) · [Security](/tnk/security)
