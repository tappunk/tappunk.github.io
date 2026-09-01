# Configuration

Primary config file:

- `~/.config/tnk/tnk.toml`

## Key settings

- `server_port` - inference API port (default `8080`)
- `workspace_root` - project root for sandbox mapping (default `~/code`)
- `model_dir` - base model directory (default `~/opt/models`)
- `default_provision_profile` - sandbox profile default (`pi`)
- `default_engine_runtime` - inference runtime (`llama`)
- `default_engine_bind_host` - host bind (`127.0.0.1` default)
- `default_engine_preset` - engine preset (must match a `.ini` file in `provider.d/`)

```toml
# tnk configuration

# API port for local inference server
server_port = 8080

# Root used for project-to-sandbox mapping (must NOT be your home directory)
workspace_root = "~/code"

# Base directory for local model files
model_dir = "~/opt/models"

# Default sandbox profile
default_provision_profile = "pi"

# Inference runtime: "llama"
default_engine_runtime = "llama"

# Bind host for inference server (127.0.0.1 for localhost only, 0.0.0.0 for all interfaces)
default_engine_bind_host = "127.0.0.1"

# Preset to load when --preset is omitted from engine start.
# Must match the filename stem of a file in ~/.config/tnk/provider.d/
# Example: "llama-default" loads ~/.config/tnk/provider.d/llama-default.ini
# default_engine_preset = "llama-default"
```

## Environment overrides

Set these to override file values:

- `TNK_SERVER_PORT`
- `TNK_WORKSPACE_ROOT`
- `TNK_MODEL_DIR`
- `TNK_PROVISION_PROFILE`
- `TNK_ENGINE_RUNTIME`
- `TNK_ENGINE_BIND_HOST`
- `TNK_ENGINE_PRESET`

## Security-relevant guidance

1. Keep `workspace_root` inside a dedicated subtree such as `~/code`.
2. Never set `workspace_root` to `$HOME`.
3. The default bind (`127.0.0.1`) restricts engine access to localhost only.
4. Prefer explicit profile declarations in automation (`--profile ...`) over implicit defaults.

Inspect effective values:

```bash
tnk config show
```

---

**See also:** [Installation](/tnk/installation) · [Security](/tnk/security) · [Troubleshooting](/tnk/troubleshooting)
