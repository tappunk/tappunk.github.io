# Profiles

Profiles define how sandbox environments are provisioned and constrained.

[tappunk/tnk-specs](https://github.com/tappunk/tnk-specs) hosts sandbox profiles. `tnk init` clones this repository into `~/.config/tnk/`.

## Common profiles

Resource values come from the YAML manifests in `~/.config/tnk/sandbox.d/manifests/`.

| Profile | CPUs | Memory | Best for |
|---------|------|--------|----------|
| `base` | 1 | 2GiB | Raw sandbox, no provision script |
| `pi` | 1 | 2GiB | **Default** coding agent |

### What each profile installs

- **`base`**: baseline resource allocation only (no provision script)
- **`pi`**: Node.js 22, `@earendil-works/pi-coding-agent`, fd, ripgrep; generates `~/.pi/agent/` config pointed at the tnk inference endpoint

### Custom profiles

Drop a shell script into `sandbox.d/provision.d/` and optionally a matching YAML manifest into `sandbox.d/manifests/`. The script name (minus `.sh`) becomes your profile name. tnk discovers both automatically.

The YAML manifest supports:

- `resources.cpus` / `resources.memory`: resource allocation
- `mounts.workspace`: guest mount path (default `/workspace`)

The default `manifests/base.yaml` provides fallback resource limits for any profile that has no manifest of its own.

When you run:

```bash
tnk sandbox shell --profile <name>
```

tnk will:

1. ensure the sandbox VM exists and is running
2. copy the profile provision script + shared lib into the VM
3. inject the provision-time env contract (`TNK_INFERENCE_URL`, `TNK_MODEL_NAME`, `TNK_CTX_WINDOW`, `TNK_WORKSPACE_MOUNT`, `TNK_ENGINE_RUNTIME`, `TNK_SPECS_REV`)
4. execute the provisioning script inside the VM

Provision state is fingerprinted so unchanged environments can skip expensive reinstall paths.

---

**See also:** [Concepts](/tnk/concepts) · [Sandboxing](/tnk/sandbox) · [Troubleshooting](/tnk/troubleshooting)
