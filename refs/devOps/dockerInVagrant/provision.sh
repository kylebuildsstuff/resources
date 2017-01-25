#!/usr/bin/env bash

echo "Updating apt-get"
apt-get update >/dev/null 2>&1
echo "Installing recommended extra packages for Docker"
sudo apt-get install curl linux-image-extra-$(uname -r) linux-image-extra-virtual
echo "Installing Docker"
sudo apt-get install apt-transport-https ca-certificates
curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -
sudo add-apt-repository \
       "deb https://apt.dockerproject.org/repo/ \
       ubuntu-$(lsb_release -cs) \
       main"
sudo apt-get update
sudo apt-get -y install docker-engine
echo "Provisioning complete"
