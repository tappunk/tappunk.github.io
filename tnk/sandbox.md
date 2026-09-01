# Sandbox

tnk uses Lima VMs (Ubuntu, Apple Virtualization framework) for sandbox execution. Each project gets its own VM instance for reproducible, isolated environments.

## Lima VM sandboxes

Each project gets its own Lima VM. VMs use Apple's Virtualization framework (`vz`) for near-native performance on Apple Silicon.

### Instance naming

VM instance names follow the convention:

```
~/code/homepage → tnk-homepage
~/code/tnk    → tnk-tnk
```

The VM is created on first use and persists across sessions. Manage with `tnk sandbox` commands.

### Networking

Sandboxes use Lima's vzNAT networking. The host inference engine is reachable at `host.lima.internal`.

### Mount configuration

Each sandbox mounts the project workspace into `/workspace` inside the VM using virtiofs. Only the project directory mounts by default.

### Provisioning

tnk copies the profile provision script and shared provisioning library into the VM, then executes the script inside the guest.

## Shared concepts

### Content-addressed provisioning

tnk tracks provision state using a fingerprint (`TNK_SPECS_REV`) derived from the specs repository revision. Adding, removing, or editing any file in the provision system triggers a new provision run.

### Baseline setup

Every sandbox VM boots from Lima's `template:ubuntu` (Ubuntu with containerd/nerdctl). The VM uses Apple Virtualization (`--vm-type=vz`) with virtiofs mounts (`--mount-type=virtiofs`).

### Network posture

Profiles declare a network policy. The default is full internet access via vzNAT. Profiles can request `network restricted` for constrained execution.

### Audit log format

`--audit-log PATH` writes NDJSON to the specified file. Each line is a complete JSON object. Example structure:

```json
{"event":"session_start","ts":1736935421,"container_id":"tnk-homepage","workdir":"/workspace","tty":true,"runtime_env":{"TNK_INFERENCE_URL":"http://host.lima.internal:8080/v1"}}
{"event":"exec_invocation","ts":1736935422,"container_id":"tnk-homepage","argv":["limactl","shell","tnk-homepage"],"tty":true}
{"event":"session_exit","ts":1736935867,"container_id":"tnk-homepage","exit_code":0}
```

---

**See also:** [Concepts](/tnk/concepts) · [Security](/tnk/security) · [Profiles](/tnk/profiles)
