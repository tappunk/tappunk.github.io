# Sandboxing

tnk uses Lima VMs (Ubuntu, Apple Virtualization framework) for sandbox execution. Each project gets its own VM instance for reproducible, isolated environments.

## Lima VM sandboxes

Each project gets its own Lima VM. VMs use Apple's Virtualization framework (`vz`) for near-native performance on Apple Silicon.

### Instance naming

VM instance names follow the convention:

```
~/code/homepage → tnk-homepage
~/code/tnk    → tnk-tnk
```

Project names that contain characters outside `[a-zA-Z0-9_-]` get a short hash suffix appended. The VM is created on first use and persists across sessions. Manage with `tnk sandbox` commands.

### Networking

Sandboxes use Lima's default virtualized networking. The host is reachable at `host.lima.internal`, which is how sandboxes reach the inference server.

### Mount configuration

Each sandbox mounts the project workspace into `/workspace` inside the VM using virtiofs. Only the project directory mounts. The guest mount path is configurable per profile via the `mounts.workspace` key in the profile manifest.

### Provisioning

tnk copies the profile provision script and shared provisioning library into the VM, then executes the script inside the guest.

## Baseline setup

Every sandbox VM boots from Lima's `template:ubuntu`. The VM uses Apple Virtualization (`--vm-type=vz`) with virtiofs mounts (`--mount-type=virtiofs`) and system containerd.

## Provision state

tnk tracks provision state using a fingerprint that combines the profile name, the deployed specs revision, and the injected runtime values (endpoint, model, context window, mount path, runtime key). Changing any of them triggers a new provision run on the next start.

To force a re-provision, delete the tracking token inside the guest:

```bash
tnk sandbox shell --no-tty -c "rm -f ~/.local/state/tnk/provision.lock"
```

## Audit log format

`--audit-log PATH` writes NDJSON to the specified file. Each line is a complete JSON object. Example structure:

```json
{"event":"session_start","ts":1736935421,"container_id":"tnk-homepage","workdir":"/workspace","tty":true,"requires_tty":true,"runtime_env":{"TNK_INFERENCE_URL":"http://host.lima.internal:9931/v1"}}
{"event":"exec_invocation","ts":1736935422,"container_id":"tnk-homepage","argv":["limactl","shell","tnk-homepage","--","export ...; exec bash -l"],"tty":true,"runtime_env":{}}
{"event":"session_exit","ts":1736935867,"container_id":"tnk-homepage","exit_code":0}
```

---

**See also:** [Concepts](/tnk/concepts) · [Security](/tnk/security) · [Profiles](/tnk/profiles)
