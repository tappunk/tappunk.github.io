# Concepts

## The two planes

tnk manages two runtime planes, each with its own lifecycle and CLI namespace.

### Engine plane

The inference engine runs on the host. tnk starts, stops, and queries it with `tnk engine`.

The default and production runtime is `llama` (llama.cpp server). The engine serves an OpenAI-compatible API that sandboxes connect over the network.

Use `tnk engine status` to check if the engine is running, `tnk engine start` to launch it, and `tnk engine stop` to shut it down.

### Sandbox plane

Per-project sandboxes managed with `tnk sandbox`. Sandboxes use Lima VMs (Ubuntu, Virtualization framework) for lightweight, reproducible isolation.

Each sandbox mounts only the project directory. Your home folder stays out of scope.

Sandbox instances are persistent. The same project directory always maps to the same instance name (`tnk-{project}`). Stop sandboxes between sessions and restart them later. `tnk sandbox delete` is the only command that removes them.

## Why sandbox

Running an AI agent on the host means it executes package installers, shell commands, and network requests with full filesystem access. A compromised dependency or a prompt-induced attack reaches your credentials, keys, and system files.

tnk keeps agent execution inside isolated Lima VM sandboxes. Each sandbox mounts only the project directory. Your home folder stays out of scope.

Sandboxes give you:

- filesystem boundaries: project files only, no `$HOME`
- process isolation: agent tools run in a separate VM with Apple Virtualization
- deterministic teardown: `tnk shutdown` stops every managed component cleanly

## Mount model

tnk maps your working directory to the sandbox's `/workspace` path using virtiofs.

```
~/code/homepage → tnk-homepage sandbox → /workspace
~/code/tnk    → tnk-tnk sandbox    → /workspace
```

Only project files appear inside the sandbox. Nothing from outside `workspace_root` mounts by default.

## Runtime environment contract

tnk injects environment variables into every sandbox session. Agents read these to find the services they need:

| Variable | Points to |
|----------|-----------|
| `TNK_INFERENCE_URL` | Engine inference API (`http://host.lima.internal:8080/v1`) |
| `TNK_OPENAI_URL` | Alias for `TNK_INFERENCE_URL` |
| `TNK_MODEL_NAME` | Current model identifier |
| `TNK_ENGINE_RUNTIME` | Active runtime name (`llama`) |

Variables are explicit. Agents cannot reach services they are not told about.

## Profile provisioning

Profiles configure sandbox environments. The flow:

1. tnk checks whether a sandbox VM exists for the current project
2. It copies the profile provision script and shared library into the VM
3. It injects the runtime env contract
4. It runs the provision script inside the sandbox

Provision state gets a fingerprint from `TNK_SPECS_REV`. If the fingerprint has not changed, tnk skips reinstallation.

All provision scripts run with `set -Eeuo pipefail` and `umask 077`. A trap handler drops tracking tokens on unexpected termination so failed provisions don't leave stale fingerprints.

### tnk-specs

[tappunk/tnk-specs](https://github.com/tappunk/tnk-specs) hosts sandbox profiles and engine presets. `tnk init` clones this repository into `~/.config/tnk/` on your host.

The repository contains:

- **Sandbox manifests**: per-profile YAML definitions under `sandbox.d/manifests/`
- **Provision scripts**: setup automation under `sandbox.d/provision.d/`
- **Model presets**: engine model INI files under `provider.d/`
- **Shared library**: `sandbox.d/provision.d/lib/provision-lib.sh`

You can point `tnk init` at a fork or custom specs repository:

```bash
tnk init --git-url https://github.com/your-org/tnk-specs.git
```

`tnk init --force` overwrites the three managed directories (`clients/`, `sandbox.d/`, `provider.d/`) with fresh content from upstream. It leaves `tnk.toml` and other user files intact.

Profiles encode resource requirements (CPUs, memory), security posture (network policy), and provisioning steps. Resource values come from the manifest YAML.

### Model presets

Model presets live in `provider.d/` and define which model file and extra flags the inference engine uses. Each preset is an INI file. Presets get updated when you run `tnk init` against a newer tnk-specs revision.

The `llama` runtime uses GGUF models. The preset controls model selection, context size, GPU offload, and threading parameters. The default preset (`llama-default`) ships with Qwen3.5-9B.

## Engine design

tnk ships with `llama` (llama.cpp server) as the default inference runtime. GGUF provides broad model availability across HuggingFace and other model repositories.

## Audit logs

Every `sandbox start` and `sandbox shell` session can record an audit trail with `--audit-log PATH`. Each entry is NDJSON and includes:

- session start and exit timestamps
- command argv (for non-TTY sessions)
- TTY mode flag
- runtime env summary

Audit logs stay local.

---

**See also:** [Sandbox](/tnk/sandbox) · [Security](/tnk/security) · [Profiles](/tnk/profiles)
