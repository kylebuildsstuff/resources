<h3>A VM to play with Docker in a linux VM</h3>

vagrant up
vagrant ssh
sudo passwd  --> change to the password you want
su -

# Installing Docker -- https://docs.docker.com/engine/installation/linux/ubuntu/
sudo apt-get update

sudo apt-get install curl \
  linux-image-extra-$(uname -r) \
  linux-image-extra-virtual

sudo apt-get install apt-transport-https \
                         ca-certificates

curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -

sudo add-apt-repository \
       "deb https://apt.dockerproject.org/repo/ \
       ubuntu-$(lsb_release -cs) \
       main"

sudo apt-get update
sudo apt-get -y install docker-engine

# UserConfig
sudo usermod -aG docker $USER
sudo usermod -aG sudo $USER

exit
vagrant ssh

--

Now you should be good to go on Ubuntu 16.04 with Docker installed using the aufs storage driver
and your user should have sudo and docker privileges
