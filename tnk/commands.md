# Commands

## Top-level

- `tnk`: show engine status
- `tnk engine`: inference engine
- `tnk sandbox`: project sandboxes
- `tnk run`: start runtime
- `tnk shutdown`: shutdown
- `tnk completion`: shell completions
- `tnk init`: init
- `tnk config`: config
- `tnk doctor`: diagnostics
- `tnk download`: download models

## Engine

### Start

```bash
tnk engine start --preset PRESET --runtime RUNTIME [--bind-host HOST] [--engine-server-port PORT] [--foreground]
```

Key flags:

- `--runtime` engine runtime (`llama`)
- `--preset` preset name (must match a `.ini` file in `provider.d/`)
- `--bind-host` server bind address (`127.0.0.1` default)
- `--engine-server-port` override API port
- `--foreground` run in foreground (blocking mode) instead of as a background daemon

### Stop

```bash
tnk engine stop [--runtime RUNTIME] [--all]
```

Default runtime is `llama`. `--all` stops every running engine regardless of runtime.

### Status

```bash
tnk engine status --output text|json|ndjson
```

### Presets

```bash
tnk engine presets --runtime RUNTIME --output text|json|ndjson [--strict]
```

Lists configured model presets from `provider.d/`. Use `--strict` to show only presets with an explicit `runtime` field matching the selected engine.

## Sandbox

### Start

```bash
tnk sandbox start [--profile PROFILE] [--audit-log PATH] [--shell]
```

Run without `--profile` to use the default profile from `tnk.toml`. Use `--shell` to attach an interactive shell after starting.

### Shell

```bash
tnk sandbox shell [--profile PROFILE] [-c|--command CMD] [--no-tty] [-e|--env KEY=VALUE] [--audit-log PATH]
```

Flags:

- `-c, --command` execute a non-interactive command instead of opening a login shell
- `--no-tty` bypass TTY requirements for automation
- `-e, --env` add environment variables in `KEY=VALUE` form (repeatable)

### Stop

```bash
tnk sandbox stop [--all] [--name SANDBOX ...]
```

`--all` and `--name` are mutually exclusive.

### Delete

```bash
tnk sandbox delete [--yes] [--dry-run]
```

Targets the sandbox for the current project directory. `-n, --dry-run` previews the action without side effects. `-y, --yes` skips the confirmation prompt.

### List

```bash
tnk sandbox ls [--output text|json|ndjson] [--quiet]
```

`--quiet` outputs only sandbox names, one per line.

## Run / shutdown

```bash
tnk run [--preset PRESET] [--runtime RUNTIME] [--dry-run]
tnk shutdown [--timeout SECONDS] [--dry-run]
```

`tnk run` boots the inference engine. `tnk shutdown` stops sandboxes and engine. Use `--timeout` to set the per-component grace period (default 30 seconds).

## Download

```bash
tnk download URL [--output text|json|ndjson] [--dry-run] [--revision REV] [--workers N] [--force]
```

Download models from Hugging Face Hub. Accepts `hf://` URIs, full URLs, or plain repo IDs (`namespace/name`). Models download to `model_dir` from `tnk.toml`.

Flags:

- `--output` output format (`text`, `json`, `ndjson`)
- `--dry-run` preview files without downloading
- `--revision` custom revision (branch, tag, or commit)
- `--workers` maximum concurrent downloads (default 4)
- `--force` overwrite existing files even if sizes match

## Global flags

`--quiet` (`-q`) and `--verbose` (`-v`) are available on all commands:

- `-q` suppresses non-error informational output
- `-v` shows detailed operational logs

## Config / init / doctor

```bash
tnk init [--git-url URL] [--force]
tnk config init [--force]
tnk config show
tnk doctor
```

## Output contract

When available, output mode is explicit:

- `text`: human-oriented status on stderr
- `json`: structured payload on stdout
- `ndjson`: one JSON object per line on stdout

Shell scripts stay stable. Terminal output stays readable.

---

**See also:** [Quickstart](/tnk/quickstart) · [Configuration](/tnk/configuration) · [Profiles](/tnk/profiles)
