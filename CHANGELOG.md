# Changelog

## [0.2.2] — 2026-06-16

### Added
- Debian packaging for Launchpad PPA
- Windows code signing via SignPath.io
- GitHub Pages website in docs/
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
- Issue and PR templates
- CHANGELOG.md

### Fixed
- Ubuntu file associations (shared-mime-info dependency)
- Context menu across Windows, Linux, macOS
- Cargo.lock regenerated for Rust 1.75.0 (Noble compatibility)
- PPA source format 3.0 (native)

## [0.2.1] — 2026-06-15

### Added
- Persistent color scheme setting (light/dark/system)
- Ubuntu context menu integration (xdg-mime)

### Fixed
- Postinst injection script handles zstd compression
- Build matrix fail-fast disabled

## [0.2.0] — 2026-06-14

### Added
- Open file dialog (Ctrl+O)
- Drag-and-drop file support
- Single-instance mode
- Desktop file association (.md, .markdown, .mdown, .mkd)
- "Read with Backtick" context menu
- Mermaid diagram rendering
- Syntax highlighting (highlight.js)
- Dark mode (system-aware + manual toggle)
- Cross-platform builds (Linux, macOS, Windows)

## [0.1.0] — 2026-06-13

### Added
- Initial Tauri v2 scaffold
- Basic Markdown rendering (marked + DOMPurify)
- CI/CD pipelines (CI + Release)
- Linux packaging (.deb, .rpm, .AppImage)
- macOS packaging (.dmg)
- Windows packaging (.msi)
