#!/bin/bash

# author: martin@affolter.net

. _config.sh
. _build.sh

cat __dockerhub_token.sh | docker login --username $githubuser --password-stdin

docker tag $containername:$tagname $githubuser/$repository:$tagname

docker push $githubuser/$repository:$tagname