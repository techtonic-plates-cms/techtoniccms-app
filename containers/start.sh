#!/bin/sh
set -e

TLS_CERT="${TLS_CERT:-/app/ssl/cert.pem}"
TLS_KEY="${TLS_KEY:-/app/ssl/key.pem}"

if [ -f "$TLS_CERT" ] && [ -f "$TLS_KEY" ]; then
    echo ":8443 {
    tls $TLS_CERT $TLS_KEY
    reverse_proxy localhost:3000
}" > /app/Caddyfile
else
    echo ":8443 {
    tls internal
    reverse_proxy localhost:3000
}" > /app/Caddyfile
fi

export ORIGIN="${ORIGIN:-https://localhost:8443}"

node build/index.js &
caddy run --config /app/Caddyfile
