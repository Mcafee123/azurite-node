#!/bin/bash

# author: martin@affolter.net

. _config.sh
. _build.sh

if test -f "$tokenfile"; then
  echo "token available"
else
  echo "Tokenfile: $tokenfile is missing"
  exit 99
fi

mkdir $local_dist_dir

cat $tokenfile | docker login --username $githubuser --password-stdin

docker tag $containername:$tagname $githubuser/$repository:$tagname

docker push $githubuser/$repository:$tagname