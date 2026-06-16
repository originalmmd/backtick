# Launchpad PPA Setup

This document explains how to set up and use the Launchpad PPA for Backtick.

PPA: https://launchpad.net/~originalmmd/+archive/ubuntu/backtick-md
Project: https://launchpad.net/backtick-md

## Prerequisites

1. **Launchpad Account**: Create one at https://launchpad.net
2. **GPG Key**: Generate and upload to Launchpad
   ```bash
   gpg --full-generate-key
   gpg --list-keys
   gpg --send-keys YOUR_KEY_ID
   ```
3. **dput**: Install for uploading packages
   ```bash
   sudo apt install dput
   ```

## Initial Setup

1. Create a PPA on Launchpad:
   - Go to https://launchpad.net/~originalmmd/+activate-ppas
   - Click "Create a new PPA"
   - Name it `backtick-md`

2. Configure dput:
   ```bash
   cat > ~/.dput.cf <<EOF
   [ppa]
   method = ftp
   incoming = ~originalmmd/ubuntu/backtick-md/
   login = anonymous
   allow_unsigned_uploads = 0
   EOF
   ```

## Building and Uploading

1. Run the build script (specify the Ubuntu series, e.g., noble for 24.04):
   ```bash
   ./build-ppa.sh noble
   ```

2. Upload to PPA:
   ```bash
   cd ..
   dput ppa:originalmmd/backtick-md backtick_*.changes
   ```

3. Wait for Launchpad to build (usually 10-30 minutes).
   Check build status at: https://launchpad.net/~originalmmd/+archive/ubuntu/backtick-md

4. Users can then install with:
   ```bash
   sudo add-apt-repository ppa:originalmmd/backtick-md
   sudo apt update
   sudo apt install backtick
   ```

## Important: Use Correct Ubuntu Series

The `debian/changelog` must specify a valid Ubuntu release codename,
not `unstable`. Launchpad will not build packages targeted at `unstable`.

Valid series names (Ubuntu 24.04+):
- `noble` (24.04 LTS) — recommended
- `oracular` (24.10)
- `plucky` (25.04)

## Troubleshooting

### Build fails on Launchpad
- Check the build log on Launchpad
- Ensure all Build-Depends are available
- Verify the debian/rules file is correct

### Upload rejected
- Check GPG key is uploaded to Launchpad
- Verify dput configuration
- Check package name doesn't conflict

### Package not installing
- Check dependencies in debian/control
- Verify architecture support
- Check postinst script for errors

### Build doesn't appear after upload
- Most common cause: `debian/changelog` uses `unstable` as the distribution.
  Launchpad requires an Ubuntu release codename (e.g., `noble`).
- Run `./build-ppa.sh <series>` with the correct series name.

## Testing Locally

Before uploading, test the package locally:

```bash
# Build the binary package
dpkg-buildpackage -b -us -uc

# Install and test
sudo dpkg -i ../backtick_*.deb

# Run the app
backtick

# Remove when done
sudo apt remove backtick
```

## Updating the Package

1. Make changes to the app
2. Update version in `src-tauri/Cargo.toml` and `src-tauri/tauri.conf.json`
3. Run `./build-ppa.sh <series>`
4. Upload the new version
5. Launchpad will build and publish automatically
