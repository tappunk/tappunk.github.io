# Commands

## Top-level

- `tnk`: list sandboxes
- `tnk run`: start project sandbox
- `tnk shutdown`: stop all sandboxes
- `tnk sandbox`: project sandboxes
- `tnk init`: install config from tnk-specs
- `tnk config`: config
- `tnk completion`: shell completions
- `tnk doctor`: diagnostics

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
- `--profile` apply a provision profile before the session

### Stop

```bash
tnk sandbox stop [--all] [--name SANDBOX ...]
```

`--all` and `--name` are mutually exclusive. Without flags, stops the sandbox for the current project directory.

### Delete

```bash
tnk sandbox delete [--yes] [-n|--dry-run]
```

Targets the sandbox for the current project directory. `-n, --dry-run` previews the action without side effects. `-y, --yes` skips the terminal requirement.

### List

```bash
tnk sandbox ls [--output text|json|ndjson] [-q|--quiet]
```

`--quiet` outputs only sandbox names, one per line.

## Run / shutdown

```bash
tnk run [--profile PROFILE] [--audit-log PATH] [--shell] [-n|--dry-run]
tnk shutdown [--timeout SECONDS] [-n|--dry-run]
```

`tnk run` boots the project sandbox (and provisions the default profile on first use). `tnk shutdown` stops every managed sandbox, escalating from a graceful stop to a forced one. `--timeout` sets the graceful-stop grace period (default 60 seconds).

## Global flags

`--quiet` (`-q`) and `--verbose` (`-v`) are available on all commands:

- `-q` suppresses non-error informational output
- `-v` shows detailed operational logs (and passes lima output through live during VM creation)

## Config / init / doctor

```bash
tnk init [--git-url URL] [--force]
tnk config init [--force]
tnk config show
tnk doctor
```

- `tnk init` installs `~/.config/tnk/` from tnk-specs (clones the repo, or copies from a local path). `--force` re-syncs the managed `sandbox.d/` directory over existing content.
- `tnk config show` prints the resolved config.
- `tnk doctor` checks config resolution, the runtime cache directory, and managed lima instances.

## Output contract

When available, output mode is explicit:

- `text`: human-oriented status on stderr
- `json`: structured payload on stdout
- `ndjson`: one JSON object per line on stdout

Shell scripts stay stable. Terminal output stays readable.

---

**See also:** [Quickstart](/tnk/quickstart) · [Configuration](/tnk/configuration) · [Profiles](/tnk/profiles)
