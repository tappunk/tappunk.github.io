# Sandbox Architecture

This is the technical core of muthr.

## Per-project container mapping

muthr resolves sandbox identity from your current directory relative to `workspace_root`.

- project dir `~/src/homepage` -> container `muthr-homepage`
- project dir `~/src/muthr` -> container `muthr-muthr`

This keeps isolation boundaries project-scoped by default.

## Mount model

Each sandbox mounts the project workspace into the guest path (default `/workspace`).

Important consequence:

- only project files are intentionally exposed
- your full host home is not mounted

## Runtime env contract

Before launching profile workflows, muthr injects an explicit env surface into sandbox sessions:

- `MUTHR_INFERENCE_URL`
- `MUTHR_OPENAI_URL`
- `MUTHR_MCP_BRIDGE_URL`
- `MUTHR_SEARXNG_URL`
- `MUTHR_MODEL_NAME`
- `MUTHR_ENGINE_RUNTIME`

This contract gives agent runtimes what they need without giving broad host context.

## Provision transport

Profile scripts are copied into container `/tmp` and executed there. muthr validates env values and model names before invocation. Provision library content is hashed into `MUTHR_SPECS_REV` for reproducibility tracking.

## Baseline hardening behavior

muthr enforces a baseline setup step for project sandboxes:

- installs required userland tooling (`bash`, `curl`, `git`, `nodejs`, `npm`, ...)
- creates/maintains `muthr` user
- syncs UID/GID with host user when possible

This avoids file ownership drift on bind mounts and keeps shell ergonomics predictable.

## Network posture

Profiles can request restricted network behavior. muthr supports deferred post-provision network isolation (`network none`) when backend supports container update. If plugin support is missing, muthr emits warning and continues safely.

## Audit logs

`sandbox start` and `sandbox shell` support `--audit-log` for NDJSON session records including:

- session start/exit timestamps
- command argv
- TTY mode
- runtime env summary

This is useful for compliance-style local tracing and incident review.
