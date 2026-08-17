# Installation

## Requirements

- Apple Silicon macOS
- **Homebrew install**: `lima` and `llama.cpp` are pulled in automatically by the formula
- **Cargo install**: install manually: `brew install lima llama.cpp`

Validate prerequisites:

```bash
tnk doctor
```

## Install tnk

### Homebrew

```bash
brew tap tappunk/tap
brew install tappunk/tap/tnk
```

### Cargo

```bash
cargo install tnk
```

## First-time bootstrap

```bash
tnk init
tnk config init
```

Inspect effective config:

```bash
tnk config show
```

## Recommended defaults

For safer project scoping:

- `workspace_root = "~/code"` (never `$HOME`)

For turnkey profile usage:

- `default_provision_profile = "pi"`

---

**See also:** [Configuration](/tnk/configuration) · [Quickstart](/tnk/quickstart) · [Troubleshooting](/tnk/troubleshooting)
