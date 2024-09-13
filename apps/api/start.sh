#!/bin/bash
set -e

if [ ! -f /data/homeserver.yaml ]; then
  echo "No config found for homeserver, generating..."
  python -m synapse.app.homeserver \
    --server-name $SYNAPSE_SERVER_NAME \
    --config-path /data/homeserver.yaml \
    --generate-config \
    --report-stats=$SYNAPSE_REPORT_STATS
  sed -i 's/bind_addresses: \[::1\]/bind_addresses: \[0.0.0.0\]/g'
fi

exec python -m synapse.app.homeserver --config-path /data/homeserver.yaml
