# Commands

This page is source-aligned with the current CLI surface.

## Top-level

- `muthr engine`
- `muthr sandbox`
- `muthr services`
- `muthr run`
- `muthr shutdown`
- `muthr completion`
- `muthr init`
- `muthr config`
- `muthr doctor`
- `muthr image`

Running `muthr` with no subcommand shows current engine/services/sandbox status.

## Engine

### Start

```bash
muthr engine start [--runtime mlxcel|llama] [--profile MODEL_OR_PRESET] [--bind-host HOST] [--engine-server-port PORT] [--foreground]
```

Key flags:

- `--runtime` choose runtime (`mlxcel` or `llama`)
- `--profile` model repo/path or preset name
- `--bind-host` server bind address (`127.0.0.1` or `0.0.0.0`)
- `--engine-server-port` override API port
- `--foreground` keep process attached to terminal

### Stop

```bash
muthr engine stop [--runtime mlxcel|llama] [--all]
```

### Status / presets

```bash
muthr engine status --output text|json|ndjson
muthr engine presets [--runtime mlxcel|llama] --output text|json|ndjson
```

## Sandbox

### Start

```bash
muthr sandbox start [--profile PROFILE] [--audit-log PATH]
```

### Shell

```bash
muthr sandbox shell [--profile PROFILE] [-c|--command CMD] [--no-tty] [-e|--env KEY=VALUE] [--audit-log PATH]
```

### Stop

```bash
muthr sandbox stop [--all] [--name SANDBOX ...]
```

`--all` and `--name` are mutually exclusive.

### Delete

```bash
muthr sandbox delete [--force] [--yes] [--dry-run]
```

Delete is context-based: it targets the sandbox for the current project directory.

### List

```bash
muthr sandbox ls --output text|json|ndjson
```

## Services

```bash
muthr services start [--dry-run]
muthr services stop [--dry-run]
muthr services restart [--dry-run]
muthr services delete [--force|--yes] [--dry-run]
muthr services status --output text|json|ndjson
```

## Run / shutdown

```bash
muthr run [--verbose] [--profile MODEL] [--runtime mlxcel|llama] [--dry-run]
muthr shutdown [--verbose] [--timeout SECONDS] [--yes] [--dry-run]
```

## Config / init / doctor / image

```bash
muthr init [--git-url URL] [--force]
muthr config init [--force]
muthr config show
muthr doctor
muthr image build --profile PROFILE
```

## Output contract

When available, output mode is explicit:

- `text`: human-oriented status on stderr
- `json`: structured payload on stdout
- `ndjson`: one JSON object per line on stdout

This keeps shell scripts stable while preserving readable terminal UX.
