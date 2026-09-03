# Configuration

Primary config file:

- `~/.config/tnk/tnk.toml`

## Key settings

- `server_port` - inference API port (default `9931`)
- `workspace_root` - project root for sandbox mapping (default `~/code`)
- `default_provision_profile` - sandbox profile default (`pi`)
- `default_engine_runtime` - inference runtime key (`llama`)
- `default_model` - model name injected into sandboxes as `TNK_MODEL_NAME` (unset by default)

```toml
# tnk configuration

# API port for inference server
server_port = 9931

# Root used for project-to-sandbox mapping (must NOT be your home directory)
workspace_root = "~/code"

# Default sandbox profile
default_provision_profile = "pi"

# Inference runtime: "llama"
default_engine_runtime = "llama"

# Model name injected into sandboxes as TNK_MODEL_NAME
# default_model = "ai-fast"
```

`default_model` is required for profiled sessions (`tnk run`, `tnk sandbox start` with a provision profile, `tnk sandbox shell --profile ...`): tnk fails fast with a config error instead of provisioning a sandbox against a missing model.

## Environment overrides

Set these to override file values:

- `TNK_SERVER_PORT`
- `TNK_WORKSPACE_ROOT`
- `TNK_PROVISION_PROFILE`
- `TNK_ENGINE_RUNTIME`
- `TNK_MODEL`

## Security-relevant guidance

1. Keep `workspace_root` inside a dedicated subtree such as `~/code`.
2. Never set `workspace_root` to `$HOME`.
3. Prefer explicit profile declarations in automation (`--profile ...`) over implicit defaults.

Inspect effective values:

```bash
tnk config show
```

---

**See also:** [Installation](/tnk/installation) · [Security](/tnk/security) · [Troubleshooting](/tnk/troubleshooting)
