# Quickstart

This path gives you a safe baseline: initialize config, boot runtime services, enter an isolated project shell, and verify status.

## 1) Initialize configuration

```bash
muthr init
muthr config init
muthr config show
```

Notes:

- `muthr init` populates `~/.config/muthr/` from `muthr-specs`.
- `muthr config init` creates `~/.config/muthr/muthr.toml` if missing.

## 2) Start engine + services

```bash
muthr run
```

Equivalent explicit flow:

```bash
muthr engine start --runtime mlxcel
muthr services start
```

## 3) Enter a project sandbox

```bash
cd ~/src/myproject
muthr sandbox shell --profile opencode
```

Hermes profile:

```bash
muthr sandbox shell --profile hermes-agent
```

## 4) Verify status

```bash
muthr
muthr sandbox ls
muthr doctor
```

## 5) Shutdown cleanly

```bash
muthr shutdown --yes
```

This stops managed project sandboxes, services containers, and engine runtimes.
