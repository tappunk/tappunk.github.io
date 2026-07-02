# Profiles

Profiles define how sandbox environments are provisioned and constrained.

The source of truth lives in `muthr-specs`; `muthr init` deploys those assets into `~/.config/muthr/`.

## Common profiles

- `base` - minimal shell-ready Debian sandbox
- `opencode` - OpenCode runtime + MCP wiring
- `hermes-agent` - Hermes runtime + provider wiring

## How profile apply works

When you run:

```bash
muthr sandbox shell --profile <name>
```

muthr will:

1. ensure project container exists/runs
2. prepare baseline packages and user mapping
3. copy profile provision script + shared lib into container
4. inject runtime env contract (`MUTHR_INFERENCE_URL`, `MUTHR_MODEL_NAME`, etc.)
5. execute provisioning script as container user `muthr`

Provision state is fingerprinted in profile tooling so unchanged environments can skip expensive reinstall paths.

## Golden images

For faster cold-start or partially offline use:

```bash
muthr image build --profile hermes-agent
```

Then subsequent profile starts can use the pre-baked image path instead of re-provisioning from scratch.
