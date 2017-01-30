# A VM to play with Docker

<p>Make sure Vagrant and VirtualBox is installed</p>

<li>vagrant up</li>
<li>vagrant ssh</li>
<li>sudo passwd  --> change to the password you want</li>
<li>su -</li>

<h3>Installing Docker -- https://docs.docker.com/engine/installation/linux/ubuntu/</h3>

<li>sudo apt-get update</li>
<li>sudo apt-get install curl \
  linux-image-extra-$(uname -r) \
  linux-image-extra-virtual</li>
<li>sudo apt-get install apt-transport-https \
                         ca-certificates</li>
<li>curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -</li>
<li>sudo add-apt-repository \
       "deb https://apt.dockerproject.org/repo/ \
       ubuntu-$(lsb_release -cs) \
       main"</li>
<li>sudo apt-get update</li>
<li>sudo apt-get -y install docker-engine</li>

<h3>UserConfig</h3>

<li>sudo usermod -aG docker $USER</li>
<li>sudo usermod -aG sudo $USER</li>
<li>exit</li>
<li>vagrant ssh</li>

<h3>Now you should be good to go on Ubuntu 16.04 with Docker installed using the aufs storage driver
and your user should have sudo and docker privileges.</h3>
