# Contributing to Backtick

Thank you for considering contributing to Backtick! We welcome
bug reports, feature requests, and pull requests.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork: `git clone https://github.com/your-username/backtick.git`
3. Set up your development environment (see README.md).
4. Create a feature branch: `git checkout -b feature/my-feature`

## Development

```bash
npm install
npm run tauri dev   # Run in development mode
npm run tauri build # Build for production
```

### Code Quality

```bash
npm run lint        # Lint JS/CSS
npm run fmt         # Format code
cargo clippy        # Lint Rust
cargo fmt --check   # Format Rust
npm test            # Run tests
```

## Pull Request Checklist

- [ ] Code follows existing style (run linters)
- [ ] Commits are signed (`git commit -S`)
- [ ] PR title follows conventional commit format
- [ ] Changes are documented in the PR description

## Commit Conventions

We use conventional commits:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `chore:` — maintenance
- `refactor:` — code restructuring

## Reporting Issues

- Search existing issues before filing a new one.
- Include steps to reproduce, expected behavior, and actual behavior.
- Attach screenshots if applicable.
- Mention your OS and Backtick version.

## Code of Conduct

Please note we have a Code of Conduct; all contributors are expected
to follow it.
