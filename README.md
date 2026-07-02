# tappunk.com

VitePress-powered static site for tappunk brand pages and project docs.

## Local development

```bash
pnpm install
pnpm docs:dev
```

## Build

```bash
pnpm docs:build
```

## Publish to repository root (GitHub Pages-compatible)

```bash
pnpm site:publish
```

This copies `site/.vitepress/dist/` to repository root and preserves root-level publishing structure.

`CNAME` is kept in `site/public/CNAME` so generated output always includes `tappunk.com`.
