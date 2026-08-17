# Troubleshooting

## `sandbox shell` says command not found for profile tools

Re-apply profile assets and reprovision:

```bash
tnk init --force
tnk sandbox shell --profile pi --no-tty --command "command -v pi || true"
```

## Sandbox cannot reach inference API

Validate host bind and endpoints:

```bash
tnk config show
tnk engine status
```

The sandbox connects to the inference engine at `host.lima.internal:{port}` inside the VM.

## Running from wrong directory/context

tnk sandbox commands require project context under `workspace_root`.

If you are outside that root, tnk exits with usage-context errors.

## Sandbox cleanup

List and stop all managed sandboxes:

```bash
tnk sandbox ls
tnk sandbox stop --all
```

Delete uses current project context:

```bash
cd ~/code/project-a && tnk sandbox delete --yes
```

## Engine/process drift

```bash
tnk engine stop --all
tnk engine start --runtime llama
```

## Reading inference server logs

Logs live in `~/.cache/tnk/`:

```bash
# View the last 100 lines
tail -n 100 ~/.cache/tnk/llama-server.log

# Follow live output
tail -f ~/.cache/tnk/llama-server.log

# Check error log separately
tail -n 100 ~/.cache/tnk/llama-server-err.log
```

## Inference server unreachable from sandbox

The sandbox connects to `host.lima.internal` (Lima's internal gateway). Check:

```bash
tnk config show | grep bind_host
tnk sandbox shell --no-tty -c "curl -s http://host.lima.internal:8080/health"
```

If the engine isn't listening, restart it with `tnk engine stop` followed by `tnk engine start --runtime llama`.

## Profile provisioning hangs

Provisioning hangs from unreachable package mirrors or a misconfigured host gateway.

```bash
tnk sandbox shell --profile pi --no-tty --command "ping -c 3 github.com"
```

If DNS fails, the VM network is broken. Try `tnk init --force` to regenerate configs.

## Pre-flight diagnostics

```bash
tnk doctor
```

---

**See also:** [Installation](/tnk/installation) · [Configuration](/tnk/configuration) · [Security](/tnk/security)
