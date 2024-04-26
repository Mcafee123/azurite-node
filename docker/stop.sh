#!/bin/bash

# author: martin@affolter.net

. _config.sh

# stop and remove container
docker container stop $containername
docker rm $containername