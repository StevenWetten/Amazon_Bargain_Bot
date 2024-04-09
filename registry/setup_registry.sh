#!/bin/bash

# create the certs in the shared /keys directory
mkdir -p /opt/keys/certs
cd /opt/keys/certs
rm -f domain.*
openssl genrsa 2048 > domain.key
chmod 400 domain.key
cp /local/repository/registry/san.cnf.template san.cnf

# In some cases we might have to switch to this to get ip address. 
# ip_address=$(nslookup $(hostname -f) | grep Server | awk -F ' ' '{printf $2}')

ip_address=$(ip addr | grep eth0| awk -F ' ' '{print $2}' | awk -F '/' '{print $1'} | tail -n 1)

sed -i "s/IPADDR/${ip_address}/g" san.cnf
openssl req -new -x509 -nodes -sha1 -days 365 -key domain.key -out domain.crt -config san.cnf

# create login/password in the shared /keys directory
mkdir -p /opt/keys/auth
cd /opt/keys/auth
docker run --rm --entrypoint htpasswd registry:2.7.0 -Bbn admin registry > htpasswd

# create a template subdirectory to be mounted to pods
mkdir -p /opt/keys/certs.d/${ip_address}:443
cp /opt/keys/certs/domain.crt /opt/keys/certs.d/${ip_address}:443/ca.crt

# launch registry
cp -R /opt/keys/certs.d /etc/docker
cd /local/repository/registry/
docker-compose up -d
