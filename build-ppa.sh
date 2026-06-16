#!/bin/bash
set -e

echo "=== Backtick PPA Build Script ==="
echo ""

# Check if we're in the right directory
if [ ! -f "debian/control" ]; then
    echo "Error: debian/control not found. Run this script from the project root."
    exit 1
fi

# Default Ubuntu series
SERIES="${1:-noble}"
PPA_NAME="backtick-md"

# Get version from Cargo.toml (package section only)
VERSION=$(sed -n '/^\[package\]/,/^\[/{/^version = /p}' src-tauri/Cargo.toml | cut -d'"' -f2)
echo "Building version: $VERSION for $SERIES"

# Update changelog with current version and series
cat > debian/changelog <<EOF
backtick ($VERSION-1) $SERIES; urgency=medium

  * Release $VERSION
  * See https://github.com/originalmmd/backtick/releases/tag/v$VERSION

 -- Robin <originalmmd@gmail.com>  $(date -R)

EOF

# Build the source package
echo ""
echo "=== Building source package ==="
dpkg-buildpackage -S -sa

echo ""
echo "=== Build complete ==="
echo ""
echo "Source package created in ../"
echo ""
echo "To upload to PPA:"
echo "  cd .."
echo "  dput ppa:originalmmd/$PPA_NAME backtick_${VERSION}-1_source.changes"
echo ""
echo "Note: Replace the series if targeting a different Ubuntu release."
echo "  Usage: ./build-ppa.sh [series]"
echo "  Example: ./build-ppa.sh noble    # Ubuntu 24.04"
echo "  Example: ./build-ppa.sh oracular # Ubuntu 24.10"
