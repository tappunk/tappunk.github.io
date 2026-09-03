# Concepts

## One plane

tnk manages one runtime plane: per-project sandboxes, with the `tnk sandbox` command family.

The inference engine runs on the host and is yours to manage. tnk expects an OpenAI-compatible server listening on `server_port` and passes its coordinates to sandboxes. It does not start, stop, download, or inspect the engine.

Sandboxes use Lima VMs (Ubuntu, Apple Virtualization framework) for lightweight, reproducible isolation.

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
| `TNK_INFERENCE_URL` | Inference API (`http://host.lima.internal:<server_port>/v1`) |
| `TNK_MODEL_NAME` | Model identifier from `default_model` |
| `TNK_ENGINE_RUNTIME` | Runtime name (`llama`) |

Variables are explicit. Agents cannot reach services they are not told about.

## Profile provisioning

Profiles configure sandbox environments. The flow:

1. tnk checks whether a sandbox VM exists for the current project
2. It copies the profile provision script and shared library into the VM
3. It injects the provision-time env contract (the runtime contract plus `TNK_CTX_WINDOW`, `TNK_WORKSPACE_MOUNT`, `TNK_SPECS_REV`)
4. It runs the provision script inside the sandbox

Provision state gets a fingerprint from the profile name, the deployed specs revision, and the injected runtime values (endpoint, model, context window, mount path, runtime key). If the fingerprint has not changed, the provision run is skipped.

All provision scripts run with `set -Eeuo pipefail` and `umask 077`. A trap handler drops the tracking token on unexpected termination so failed provisions don't leave stale fingerprints.

### tnk-specs

[tappunk/tnk-specs](https://github.com/tappunk/tnk-specs) hosts the config template and sandbox assets. `tnk init` clones this repository into `~/.config/tnk/` on your host.

The repository contains:

- **Config template**: `tnk.toml` installed as the base of `~/.config/tnk/`
- **Sandbox manifests**: per-profile YAML definitions under `sandbox.d/manifests/`
- **Provision scripts**: setup automation under `sandbox.d/provision.d/`
- **Shared library**: `sandbox.d/provision.d/lib/provision-lib.sh`

You can point `tnk init` at a fork or custom specs repository:

```bash
tnk init --git-url https://github.com/your-org/tnk-specs.git
```

`tnk init --force` re-syncs the managed `sandbox.d/` directory with fresh content from the specs source. It leaves `tnk.toml` and other user files intact.

Profiles encode resource requirements (CPUs, memory), mount configuration, and provisioning steps. Resource values come from the manifest YAML.

## Audit logs

Every `sandbox start` and `sandbox shell` session can record an audit trail with `--audit-log PATH`. Each entry is NDJSON and includes:

- session start and exit timestamps
- exec invocation argv
- TTY mode flag
- runtime env summary

Audit logs stay local.

---

**See also:** [Sandbox](/tnk/sandbox) · [Security](/tnk/security) · [Profiles](/tnk/profiles)
