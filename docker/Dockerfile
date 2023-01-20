# DO NOT USE AZURITE 3.18.0: upsert throws a 404 when entity does not exist
FROM mcr.microsoft.com/azure-storage/azurite:3.19.0 AS azurite
# DO NOT USE AZURITE 3.18.0: upsert throws a 404 when entity does not exist

ENV location /data/default

RUN cd /opt && mkdir azurite-node
COPY ./azurite-node/index.js /opt/azurite-node
COPY ./entrypoint.sh /opt

CMD cd /opt && ./entrypoint.sh ${location}