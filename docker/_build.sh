#!/bin/bash

# author: martin@affolter.net

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
docker build -t $containername:$tagname .