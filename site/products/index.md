# Products

The tappunk stack is organized around one flagship runtime system and a supporting Unix toolchain.

## Flagship

### muthr

Zero-trust orchestrator for local AI runtime lifecycle, project sandboxes, and MCP-accessible services.

Designed for operators running local models on Apple Silicon who want control without hidden state.

- Docs: [/muthr/](/muthr/)
- Source: [github.com/tappunk/muthr](https://github.com/tappunk/muthr)
- Specs: [github.com/tappunk/muthr-specs](https://github.com/tappunk/muthr-specs)

## Toolchain

- [gre](https://github.com/tappunk/gre) - parallel git status helper
- [gsty](https://github.com/tappunk/gsty) - Ghostty theme TUI tooling
- [utmd](https://github.com/tappunk/utmd) - UTM VM lifecycle control

## Install via Homebrew

All primary tappunk Rust apps are installable with Homebrew:

```bash
brew install tappunk/tappunk/gre
brew install tappunk/tappunk/gsty
brew install tappunk/tappunk/muthr
brew install tappunk/tappunk/utmd
```

If you are using the dedicated `muthr` tap, this is also valid:

```bash
brew install tappunk/muthr/muthr
```

## In Development

Upcoming work (including `gle`) will appear here as repositories and docs reach production quality.
