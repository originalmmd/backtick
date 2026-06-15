#!/bin/bash
set -e

echo "=== Backtick PPA Build Script ==="
echo ""

# Check if we're in the right directory
if [ ! -f "debian/control" ]; then
    echo "Error: debian/control not found. Run this script from the project root."
    exit 1
fi

# Get version from Cargo.toml
VERSION=$(grep '^version = ' src-tauri/Cargo.toml | cut -d'"' -f2)
echo "Building version: $VERSION"

# Update changelog with current version
cat > debian/changelog <<EOF
backtick ($VERSION-1) unstable; urgency=medium

  * Release $VERSION
  * See https://github.com/originalmmd/backtick/releases/tag/v$VERSION

 -- Robin <robin@originalmmd.com>  $(date -R)

EOF

# Build the source package
echo ""
echo "=== Building source package ==="
dpkg-buildpackage -S -sa -us -uc

echo ""
echo "=== Build complete ==="
echo ""
echo "Source package created in ../"
echo ""
echo "To upload to PPA:"
echo "  cd .."
echo "  dput ppa:yourname/backtick backtick_${VERSION}-1_source.changes"
echo ""
echo "Replace 'yourname' with your Launchpad username."
