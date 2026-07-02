# Installation

## Requirements

- Apple Silicon macOS
- [Apple container CLI](https://github.com/apple/container) (`container`)
- one inference backend:
  - [mlxcel](https://github.com/lablup/mlxcel) (`mlxcel-server`)
  - [llama.cpp](https://github.com/ggml-org/llama.cpp) (`llama-server`)

You can validate prerequisites with:

```bash
muthr doctor
```

## Install muthr

### Homebrew

```bash
brew install tappunk/muthr/muthr
```

### Cargo

```bash
cargo install muthr
```

## First-time bootstrap

```bash
muthr init
muthr config init
```

Then inspect effective config:

```bash
muthr config show
```

## Recommended defaults

For sandbox connectivity to host inference:

- `default_engine_bind_host = "0.0.0.0"`

For safer project scoping:

- `workspace_root = "~/src"` (never `$HOME`)

For turnkey profile usage:

- `default_provision_profile = "opencode"` or `"hermes-agent"`
