#!/bin/bash

# author: martin@affolter.net

local_dist_dir="azurite-node"
containername="azurite-node"

# create dir
if test -f "$local_dist_dir"; then
  echo 'nothing to clean up'
else
  echo 'remove'
  rm -r ./$local_dist_dir
fi
mkdir $local_dist_dir

echo "compile api using @vercel/ncc" 
pushd .
cd ../ 
npm run compile
popd

echo "build"
docker build -t $containername . # --build-arg DATABASE_PASSWORD=$password

echo "run"
docker run -d -p 10000:10000 -p 10001:10001 -p 10002:10002 -p 3000:3000 --name $containername $containername

echo "start express api in docker container"
docker exec -d $containername sh -c 'cd /opt/azurite-node && node index.js'
