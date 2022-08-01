#!/bin/bash

# author: martin@affolter.net

containername="azurite-node"

# stop and remove container
docker container stop $containername
docker rm $containername