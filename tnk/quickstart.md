# Quickstart

## 1) Initialize configuration

```bash
tnk init
tnk config init
tnk config show
```

- `tnk init` populates `~/.config/tnk/` from `tnk-specs`.
- `tnk config init` creates `~/.config/tnk/tnk.toml` if missing.

## 2) Start the engine

```bash
tnk run
```

Starts the inference engine on the host.

## 3) Enter a project sandbox

```bash
cd ~/code/myproject
tnk sandbox shell
```

For quick commands without a full interactive shell:

```bash
tnk sandbox shell --no-tty -c "echo hello"
```

## 4) Check runtime status

```bash
tnk                        # engine status
tnk engine status --output json
tnk sandbox ls
tnk doctor
```

## 5) Download a model

```bash
tnk download bartowski/Qwen_Qwen3.5-9B-GGUF
```

Downloads from Hugging Face Hub to `model_dir` (default `~/opt/models`).

## 6) Shutdown cleanly

```bash
tnk shutdown
```

tnk stops sandboxes and engine in dependency order.

---

**See also:** [Installation](/tnk/installation) · [Commands](/tnk/commands) · [Concepts](/tnk/concepts)
