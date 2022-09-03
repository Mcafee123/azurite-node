#!/bin/sh

# author: martin@affolter.net

. _config.sh
. _build.sh

echo "run"
docker run -d -p 10000:10000 -p 10001:10001 -p 10002:10002 -p 3000:3000 --name $containername $containername:$tagname
# docker run -it -p 10000:10000 -p 10001:10001 -p 10002:10002 -p 3000:3000 --name $containername $containername:$tagname /bin/sh

# echo "start express api in docker container"
# docker exec -d $containername sh -c 'cd /opt/azurite-node && node index.js'
