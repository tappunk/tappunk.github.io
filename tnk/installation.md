# Installation

## Requirements

- Apple Silicon macOS
- Homebrew
- **Homebrew install**: `lima` is pulled in automatically by the formula
- **Cargo install**: install manually with `brew install lima`
- An OpenAI-compatible inference server on the host (tnk does not manage the engine)

Validate prerequisites:

```bash
tnk doctor
```

## Install tnk

### Homebrew

```bash
brew tap tappunk/tap
brew trust tappunk/tap            # required on recent Homebrew versions
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

`tnk init` clones [tnk-specs](https://github.com/tappunk/tnk-specs) into `~/.config/tnk/`. `tnk config init` creates `~/.config/tnk/tnk.toml` only if it is missing.

Inspect effective config:

```bash
tnk config show
```

## Recommended defaults

For safer project scoping:

- `workspace_root = "~/code"` (never `$HOME`)
- `default_model` set to a model your host inference server actually serves
