#!/bin/bash

set -x
sudo apt-get install -y nfs-common
sudo mkdir -p /opt/keys

while [ ! -d /opt/keys/flagdir ]; do
  sudo mount 192.168.1.1:/opt/keys /opt/keys
  sleep 10
done

while [ ! -f /opt/keys/config.yaml ]; do
  sleep 20
done

for mount_dir in home software scratch
do
  mkdir -p /opt/${mount_dir}
  mount 192.168.1.1:/opt/${mount_dir} /opt/${mount_dir}
done

curl -sfL https://get.rke2.io | INSTALL_RKE2_TYPE="agent" sh -
systemctl enable rke2-agent.service
mkdir -p /etc/rancher/rke2/
cp /opt/keys/config.yaml /etc/rancher/rke2/config.yaml
systemctl start rke2-agent.service

while [ ! -d /opt/keys/certs.d ]; do
  sleep 10
done

cp -R /opt/keys/certs.d /etc/docker
