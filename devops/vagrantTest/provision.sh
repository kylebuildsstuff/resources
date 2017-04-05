#!/usr/bin/env bash

echo "Installing Nginx and setting Nginx up... please wait"
apt-get update >/dev/null 2>&1
apt-get install -y nginx >/dev/null 2>&1
rm -rf /usr/share/nginx/www
ln -fs /vagrant /usr/share/nginx/www
