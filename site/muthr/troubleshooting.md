# Troubleshooting

## `sandbox shell` says command not found for profile tools

Re-apply profile assets and reprovision:

```bash
muthr init --force
muthr sandbox shell --profile hermes-agent --no-tty --command "command -v hermes || true"
```

## Sandbox cannot reach inference API

Validate host bind and endpoints:

```bash
muthr config show
muthr engine status
```

For sandbox access, ensure bind host is `0.0.0.0`.

Probe from sandbox:

```bash
muthr sandbox shell --profile opencode --no-tty --command "python3 - <<'PY'
import os, urllib.request
u=os.environ['MUTHR_INFERENCE_URL'].rstrip('/') + '/models'
print('url', u)
print('status', urllib.request.urlopen(u, timeout=8).status)
PY"
```

## Running from wrong directory/context

muthr sandbox commands require project context under `workspace_root`.

If you are outside that root, muthr exits with usage-context errors.

## Sandbox cleanup

List + stop all managed sandboxes:

```bash
muthr sandbox ls
muthr sandbox stop --all
```

Delete uses current project context:

```bash
cd ~/src/project-a && muthr sandbox delete --yes
cd ~/src/project-b && muthr sandbox delete --yes
```

## Service plane issues

```bash
muthr services status --output json
muthr services restart
```

## Engine/process drift

```bash
muthr engine stop --all
muthr engine start --runtime mlxcel
```

## Pre-flight diagnostics

```bash
muthr doctor
```

This checks container CLI availability, arm64 buildkit behavior, config resolution, and managed runtime state.
