#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# Inject PROJECT_DOMAIN if available
if [ -n "${COZE_PROJECT_DOMAIN_DEFAULT:-}" ]; then
  export PROJECT_DOMAIN="$COZE_PROJECT_DOMAIN_DEFAULT"
  echo "PROJECT_DOMAIN=$PROJECT_DOMAIN"
fi

# Kill any existing process on port 5000 (never touch 9000)
fuser -k 5000/tcp 2>/dev/null || true
# Kill any existing process on port 3000 (NestJS backend)
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

# Start Taro H5 (port 5000) + NestJS backend (port 3000) concurrently
exec pnpm dev
