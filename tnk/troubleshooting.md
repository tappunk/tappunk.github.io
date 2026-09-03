# Troubleshooting

## `sandbox shell` says command not found for profile tools

Re-apply profile assets and reprovision:

```bash
tnk init --force
tnk sandbox shell --profile pi --no-tty --command "command -v pi || true"
```

Provision runs are skipped when the fingerprint is unchanged. To force a re-provision, clear the tracking token inside the guest:

```bash
tnk sandbox shell --no-tty -c "rm -f ~/.local/state/tnk/provision.lock"
tnk sandbox shell --profile pi --no-tty --command "command -v pi || true"
```

## Sandbox cannot reach inference API

Check the host endpoint and the config:

```bash
tnk config show
curl -s http://127.0.0.1:9931/health
```

The sandbox connects to the inference server at `host.lima.internal:<server_port>` inside the VM. From within a sandbox:

```bash
tnk sandbox shell --no-tty -c "curl -s http://host.lima.internal:9931/v1/models"
```

If the host endpoint fails, the problem is your inference server, not tnk.

## `no model configured` error

Profiled commands require `default_model` in `~/.config/tnk/tnk.toml` (or `TNK_MODEL` in the environment). Set it to the model name your host inference server serves.

## Running from wrong directory/context

tnk sandbox commands require project context under `workspace_root`.

If you are outside that root, tnk exits with a usage error. Set `workspace_root` (or `TNK_WORKSPACE_ROOT`) to the directory containing your projects.

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

## Profile provisioning hangs

Provisioning hangs on unreachable package mirrors or a broken VM network.

```bash
tnk sandbox shell --no-tty -c "ping -c 3 github.com"
```

If DNS fails, the VM network is broken. Check lima state with `limactl list` and restart the instance:

```bash
tnk sandbox stop
limactl delete --force tnk-<project>
```

## Pre-flight diagnostics

```bash
tnk doctor
```

---

**See also:** [Installation](/tnk/installation) · [Configuration](/tnk/configuration) · [Sandboxing](/tnk/sandbox)
