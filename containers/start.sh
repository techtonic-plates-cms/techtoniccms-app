#!/bin/sh
set -e

PORT="${PORT:-8443}"
TLS_CERT="${TLS_CERT:-/app/ssl/cert.pem}"
TLS_KEY="${TLS_KEY:-/app/ssl/key.pem}"

# Extract hostname from ORIGIN for self-signed cert generation
# e.g. https://172.16.30.163:8080 -> 172.16.30.163
ORIGIN_HOST=""
if [ -n "${ORIGIN:-}" ]; then
    ORIGIN_HOST=$(echo "$ORIGIN" | sed -E 's|https?://||' | sed -E 's|:[0-9]+$||')
fi

# User-provided certificates
if [ -n "${TLS_CERT:-}" ] && [ -n "${TLS_KEY:-}" ] && [ -f "$TLS_CERT" ] && [ -f "$TLS_KEY" ]; then
    echo ":$PORT {
    tls $TLS_CERT $TLS_KEY
    reverse_proxy localhost:3000
}" > /tmp/Caddyfile

# Self-signed cert for the ORIGIN host (IP or domain)
elif [ -n "${ORIGIN_HOST:-}" ] && [ "${GENERATE_SELF_SIGNED:-true}" = "true" ]; then
    mkdir -p /app/ssl
    if [ ! -f /app/ssl/selfsigned.crt ] || [ ! -f /app/ssl/selfsigned.key ]; then
        # Detect if ORIGIN_HOST is an IP address
        if echo "$ORIGIN_HOST" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$'; then
            SAN="IP:$ORIGIN_HOST"
        else
            SAN="DNS:$ORIGIN_HOST"
        fi
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /app/ssl/selfsigned.key \
            -out /app/ssl/selfsigned.crt \
            -subj "/CN=$ORIGIN_HOST" \
            -addext "subjectAltName=$SAN"
    fi
    echo ":$PORT {
    tls /app/ssl/selfsigned.crt /app/ssl/selfsigned.key
    reverse_proxy localhost:3000
}" > /tmp/Caddyfile

# Caddy internal CA (works for localhost only)
else
    echo ":$PORT {
    tls internal
    reverse_proxy localhost:3000
}" > /tmp/Caddyfile
fi

export ORIGIN="${ORIGIN:-https://localhost:$PORT}"

node build/index.js &
caddy run --config /tmp/Caddyfile
