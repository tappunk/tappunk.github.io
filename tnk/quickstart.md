# Quickstart

## 1) Install

```bash
brew tap tappunk/tap
brew trust tappunk/tap            # required on recent Homebrew versions
brew install tappunk/tap/tnk
```

## 2) Initialize configuration

```bash
tnk init
tnk config init
tnk config show
```

- `tnk init` populates `~/.config/tnk/` from [tnk-specs](https://github.com/tappunk/tnk-specs).
- `tnk config init` creates `~/.config/tnk/tnk.toml` if missing.

Set `default_model` in `~/.config/tnk/tnk.toml` to the model name your host inference server serves:

```toml
default_model = "ai-fast"
```

## 3) Start your inference server

tnk does not manage the engine. Run an OpenAI-compatible server on the host at the configured `server_port` (default `9931`), then verify:

```bash
curl -s http://127.0.0.1:9931/health
```

## 4) Start a project sandbox

```bash
cd ~/code/myproject
tnk run                           # boots the VM and provisions the default profile
tnk sandbox shell
```

`tnk sandbox shell` is also available on its own. For quick commands without a full interactive shell:

```bash
tnk sandbox shell --no-tty -c "echo hello"
```

## 5) Check status and tear down

```bash
tnk sandbox ls                    # list sandboxes
tnk doctor                        # health checks
tnk shutdown                      # stop all sandboxes
```
