#!/bin/bash

set -x

helm repo add jenkins https://charts.jenkins.io
helm repo update

export KUBEHEAD=$(kubectl get nodes -o custom-columns=NAME:.status.addresses[1].address,IP:.status.addresses[0].address | grep head | awk -F ' ' '{print $2}')
cp /local/repository/jenkins/values.yaml .
sed -i "s/KUBEHEAD/${KUBEHEAD}/g" values.yaml
helm install jenkins jenkins/jenkins -f values.yaml 

