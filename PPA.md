# Launchpad PPA Setup

This document explains how to set up and use the Launchpad PPA for Backtick.

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
   - Go to https://launchpad.net/~YOUR_USERNAME/+activate-ppas
   - Click "Create a new PPA"
   - Name it `backtick`

2. Configure dput:
   ```bash
   cat > ~/.dput.conf <<EOF
   [ppa]
   method = ftp
   incoming = ~YOUR_USERNAME/ubuntu/
   login = anonymous
   allow_unsigned_uploads = 0
   EOF
   ```

## Building and Uploading

1. Run the build script:
   ```bash
   ./build-ppa.sh
   ```

2. Upload to PPA:
   ```bash
   cd ..
   dput ppa:YOUR_USERNAME/backtick backtick_*.changes
   ```

3. Wait for Launchpad to build (usually 10-30 minutes)

4. Users can then install with:
   ```bash
   sudo add-apt-repository ppa:YOUR_USERNAME/backtick
   sudo apt update
   sudo apt install backtick
   ```

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

## Testing Locally

Before uploading, test the package locally:

```bash
# Build the package
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
3. Run `./build-ppa.sh`
4. Upload the new version
5. Launchpad will build and publish automatically
