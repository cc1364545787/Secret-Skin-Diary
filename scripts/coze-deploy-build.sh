#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "Installing dependencies..."
pnpm install

echo "Building project (H5 + WeApp + TT + Server)..."
pnpm build

echo "Build completed successfully."
