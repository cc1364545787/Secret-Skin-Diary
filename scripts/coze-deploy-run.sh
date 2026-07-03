#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR/server/dist"

PORT="${DEPLOY_RUN_PORT:-5000}"
echo "Starting NestJS server on port ${PORT}..."
exec node ./main.js -p "${PORT}"
