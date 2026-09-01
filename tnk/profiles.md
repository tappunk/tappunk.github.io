# Profiles

Profiles define how sandbox environments are provisioned and constrained.

[tappunk/tnk-specs](https://github.com/tappunk/tnk-specs) hosts sandbox profiles. `tnk init` clones this repository into `~/.config/tnk/`.

## Common profiles

Resource values come from the YAML manifests in `~/.config/tnk/sandbox.d/manifests/`.

| Profile | CPUs | Memory | Best for |
|---------|------|--------|----------|
| `base` | 1 | 2GiB | **Default**: `tnk sandbox shell` without `--profile` |
| `pi` | 1 | 2GiB | **Default** coding agent |

### What each profile installs

- **`base`**: baseline resource allocation only (no provision script)
- **`pi`**: Node.js, `@earendil-works/pi-coding-agent`, fd, ripgrep

### Custom profiles

Drop a shell script into `sandbox.d/provision.d/` and a matching YAML manifest into `sandbox.d/manifests/`. The script name (minus `.sh`) becomes your profile name. tnk discovers both automatically.

The YAML manifest supports:

- `resources.cpus` / `resources.memory`: resource allocation
- `security.network`: `host` (default) or `restricted`
- `mounts.workspace`: guest mount path (default `/workspace`)

When you run:

```bash
tnk sandbox shell --profile <name>
```

tnk will:

1. ensure sandbox VM exists/running
2. copy profile provision script + shared lib into VM
3. inject runtime env contract (`TNK_INFERENCE_URL`, `TNK_MODEL_NAME`, etc.)
4. execute provisioning script inside the VM

Provision state is fingerprinted so unchanged environments can skip expensive reinstall paths.

---

**See also:** [Concepts](/tnk/concepts) · [Sandbox](/tnk/sandbox) · [Troubleshooting](/tnk/troubleshooting)
