#!/bin/sh

# author: martin@affolter.net

. _config.sh
. _build.sh

localdatafolder="$(pwd)/../azurite-data"
if test -f "$localdatafolder"; then
  echo "create \"localdatafolder\""
  mkdir "$localdatafolder"
fi
location="/data/newfolder"
volume="$localdatafolder:/data"
echo "run"
docker run -d -e location="$location" -v "$volume" -p 10000:10000 -p 10001:10001 -p 10002:10002 -p 3000:3000 --name $containername $containername:$tagname
# docker run -it -p 10000:10000 -p 10001:10001 -p 10002:10002 -p 3000:3000 --name $containername $containername:$tagname /bin/sh

# echo "start express api in docker container"
# docker exec -d $containername sh -c 'cd /opt/azurite-node && node index.js'
