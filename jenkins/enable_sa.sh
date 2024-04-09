#!/bin/bash

kubectl create clusterrolebinding permissive-binding --clusterrole=cluster-admin --user=admin --user=kubelet --group=system:serviceaccounts
kubectl create clusterrolebinding jenkins --clusterrole cluster-admin --serviceaccount=default:jenkins
