# Configuration

Primary config file:

- `~/.config/muthr/muthr.toml`

## Key settings

- `server_port` - inference API port (default `8080`)
- `workspace_root` - project root for sandbox mapping (default `~/src`)
- `model_dir` - base model directory (default `~/opt/models`)
- `default_provision_profile` - sandbox profile default (`opencode`, `hermes-agent`, ...)
- `default_engine_runtime` - `mlxcel` or `llama`
- `default_engine_bind_host` - host bind (`0.0.0.0` or `127.0.0.1`)
- `default_engine_profile` - default model/profile if none provided
- `container_host_gateway` - optional explicit host gateway IP for containers

## Environment overrides

All below override file values when set:

- `MUTHR_SERVER_PORT`
- `MUTHR_WORKSPACE_ROOT`
- `MUTHR_MODEL_DIR`
- `MUTHR_PROVISION_PROFILE`
- `MUTHR_ENGINE_RUNTIME`
- `MUTHR_ENGINE_BIND_HOST`
- `MUTHR_ENGINE_PROFILE`
- `MUTHR_CONTAINER_HOST_GATEWAY`

## Security-relevant guidance

1. Keep `workspace_root` inside a dedicated subtree such as `~/src`.
2. Never set `workspace_root` to `$HOME`.
3. Use `default_engine_bind_host = "0.0.0.0"` only when sandboxes need host inference access.
4. Prefer explicit profile declarations in automation (`--profile ...`) over implicit defaults.

You can inspect effective values with:

```bash
muthr config show
```
