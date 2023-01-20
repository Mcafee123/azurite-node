#!/bin/sh

# author: martin@affolter.net

location="$1"

echo "starting azurite..."
azurite --location "$location" --blobHost 0.0.0.0 --queueHost 0.0.0.0 --tableHost 0.0.0.0 --skipApiVersionCheck &

echo "starting Node API..."
cd /opt/azurite-node
node index.js
