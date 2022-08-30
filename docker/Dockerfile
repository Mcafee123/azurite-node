# DO NOT USE AZURITE 3.18.0: upsert throws a 404 when entity does not exist
FROM mcr.microsoft.com/azure-storage/azurite:3.19.0 AS azurite
# DO NOT USE AZURITE 3.18.0: upsert throws a 404 when entity does not exist

RUN cd /opt && mkdir azurite-node
COPY ./azurite-node/index.js /opt/azurite-node

# # Blob Storage Port
# EXPOSE 10000
# # Queue Storage Port
# EXPOSE 10001
# # Table Storage Port
# EXPOSE 10002

CMD ["azurite", "-l", "/data", "--blobHost", "0.0.0.0","--queueHost", "0.0.0.0", "--tableHost", "0.0.0.0"]