# muthr

muthr is a zero-trust orchestrator for local AI on Apple Silicon. It runs inference engines on the host, isolates agent runtimes inside per-project containers, and provides stable service endpoints for MCP and search tooling.

If you like Unix and POSIX design principles, muthr should feel familiar:

- clear subcommands for discrete lifecycle domains
- scriptable output (`text`, `json`, `ndjson`)
- explicit defaults and explicit overrides
- safe behavior when context is missing or unsafe

## Why this exists

Running AI agents directly on your host is high-risk. Modern agent stacks execute package installers, shell commands, generated scripts, and network clients with broad filesystem access. A single compromised dependency, malicious prompt chain, or unsafe tool invocation can lead to credential leakage or host compromise.

muthr's core value is practical risk reduction with low operational friction:

- isolate agent execution into sandbox containers
- preserve host-only assets outside container mounts
- gate runtime context with explicit env contracts
- keep lifecycle operations observable and auditable

## Core model

1. **Host inference runtime**
   - `mlxcel-server` or `llama-server` managed by `muthr engine`
2. **Persistent services plane**
   - `muthr-services` + `muthr-searxng` managed by `muthr services`
3. **Per-project sandbox**
   - one container per project directory, managed by `muthr sandbox`

The default `muthr run` path boots engine + services, then you enter project sandboxes as needed.

## Read next

1. [Quickstart](/muthr/quickstart)
2. [Commands](/muthr/commands)
3. [Sandbox Architecture](/muthr/sandbox-architecture)
4. [Security](/muthr/security)

## Acknowledgements

muthr builds on excellent open-source foundations:

- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [mlxcel](https://github.com/lablup/mlxcel)
- [Apple container](https://github.com/apple/container)
