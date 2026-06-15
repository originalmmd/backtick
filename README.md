# Backtick

> A razor-sharp, zero-bloat Markdown document reader. You open a file, it renders it perfectly. That's it.

[Latest Release](https://github.com/originalmmd/backtick/releases/latest) · [Download Example](https://raw.githubusercontent.com/originalmmd/backtick/main/example.md)

Backtick is an uncompromisingly minimal desktop utility built for developers, writers, and technical readers who need a fast, standalone way to view `.md` files without spinning up a heavy IDE or a resource-hogging Electron wrapper.

---

## ⚡ The Tauri Advantage: Lean & Hyper-Fast

Most modern desktop apps are essentially stripped-down web browsers that swallow hundreds of megabytes of RAM just to show you text. Backtick throws that out.

Built on **Tauri**, Backtick pairs a high-performance Rust backend with the operating system's native Webview rendering engine.

* **Tiny Binary Size:** Under 10MB across all operating systems.
* **Near-Zero RAM Footprint:** Uses a fraction of the memory consumed by Electron-based readers.
* **Instant Start:** Launches in milliseconds when you open a document.

---

## 🛠️ Native OS Integration

Backtick isn't just a sandboxed app; it behaves like a native system component right out of the box during installation.

### File Association (`.md`)

During setup, you can optionally set Backtick as your default system viewer for all Markdown files. Double-clicking any `.md` file in your file explorer instantly opens it rendered in Backtick.

### "Read" Context Menu

Backtick hooks natively into your Operating System's context menu. Right-click any file or folder to instantly access the **"Read with Backtick"** shortcut for lightning-fast previews.

---

## 📦 Cross-Platform Support & Installation

Backtick targets native architectures across Windows, macOS, and Linux.

### Windows

Download the lightweight native installer (`.msi` or `.exe`).

* Supports automatic `.md` file association.
* Installs the native Windows Explorer context menu entry.

### macOS

Available as a universal `.dmg` supporting both Intel and Apple Silicon (`M1/M2/M3/M4`).

* Integrates with macOS Finder Quick Actions and "Open With" menus.

### Linux

We believe in native package management. Backtick is distributed via standard system installers:

```bash
# Debian / Ubuntu (APT)
sudo apt install backtick

# Arch Linux (AUR)
paru -S backtick-bin

# Also available as Flatpak & AppImage
flatpak install flathub app.backtick.Reader

```

---

## 🕊️ Open Source to the Core

Backtick is free, open-source software licensed under the MIT License. We built this app because tools shouldn't overreach.

* **No Analytics:** We track zero clicks, zero open events, and zero usage metrics.
* **100% Offline:** Backtick runs entirely local on your machine. It has no networking permissions, doesn't load external fonts or telemetry, and never makes a single call out to the internet.
* **Community Driven:** No commercial tiers, no premium extensions, no monetization. It is built by the community, for the community.

### Contributing & Building from Source

Prerequisites: Ensure you have `Rust`, `Node.js`, and the `Tauri CLI` installed.

```bash
# Clone the repository
git clone https://github.com/originalmmd/backtick.git
cd backtick

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build production binaries for your local OS
npm run tauri build

```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
