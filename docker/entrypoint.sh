#!/bin/sh

# author: martin@affolter.net

echo "starting azurite..."
azurite -l /data --blobHost 0.0.0.0 --queueHost 0.0.0.0 --tableHost 0.0.0.0 --skipApiVersionCheck &

echo "starting Node API..."
cd /opt/azurite-node
node index.js
