whoami
ssh-keygen
ls
pwd
ls
ssh-copy-id test172.31.98.182
ssh-copy-id
ssh-copy-id test 172.31.98.182
ssh-copy-id 172.31.98.182
ssh 54.213.92.67
ssh-copy-id 54.202.173.142
ssh 54.202.173.142
ssh 54.213.92.67
ssh-copy-id 54.213.92.67
ssh 54.213.92.67
ssh 54.202.173.142
exit
ssh ktruong0082
ssh ktruong0083
su -u
su -
exit
ansible apacheweb -m ping
ansible --help
ansible all --list
cat /etc/ansible/hosts
ansible apacheweb -m ping
cd 
ls
pwd
nano hosts
ansible ktruong3 -m ping
ansible ktruong0083 -i hosts -m ping
nano hosts
ansible ktruong3 -i hosts -m ping
ansible --help
ansible all --list-hosts
su -
ssh-copy-id -i /home/test/.ssh/id_rsa.pub 172.31.103.141
ansible all --list
cat /etc/ansible/hosts
man ansible
man ansible-doc
ansible apacheweb -m ping
ansible all -m ping
ls
nano hosts
ping www.google.com.2
ansible apacheweb -m ping
ansible apacheweb -i hosts -m ping
sudo cp /etc/ansible/ansible.cfg .
ls
pwd
su -
ls
pwd
su -
ls
pwd
ll
ls
nano ansible.cfg 
ansible apacheweb -m ping
ls
mkdir config
ls
cd config
ls
mv ../ansible.cfg .
nano ansible.cfg 
ls
pwd
ls
cd ..
ls
pwd
ansible apacheweb -m ping
cd config
nano ansible.cfg 
pwd
ls
pwd
ls
cd ..
ls
cd config
ls
nano ansible.cfg 
pwd
ls
pwd
nano ansible.cfg 
ls
pwd
cd ..
ls
pwd
ls
cd config
ls
cd ..
ls
pwd
ansible apacheweb -m ping
ls
pwd
cd config
pwd
ls
echo $ANSIBLE_CONFIG
echo ANSIBLE_CONFIG
env
env | grep ANSIBLE
cat env | grep ANSIBLE
env | grep OLD
export ANSIBLE_CONFIG=/home/test/config/ansible.cfg
set | grep ANSIBLE
ansible apacheweb -m ping
man set
set --help
man set
exit
ls
cd playbooks
ls
cd ..
ls
ansible all --list-hosts
cat /etc/ansible/hosts
sudo /etc/ansible/ansible.cfg
su -
sudo echo "as"
su -
sudo echo "asd"
groups
groups test
groups all
groups ls
groups --ls
groups --list
exit
groups test
sudo echo "asdAS"
sudo nano visudo
sudo visudo
exit
sudo echo "asd"
sudo yum update
sudo echo "asd"
sudo nano /etc/ansible/ansible.cfg
ssh-copy-id localhost
ansivble local -m ping
ansible local -m ping
ansible all -m ping
sudo cat /etc/ansible/hosts
sudo echo "asd"
sudo cat /etc/ansible/hosts
sudo visudo
exit
sudo echo "asD"
sudo visudo
exit
sudo echo "asd"
sudo cat /etc/ansible/hosts
sudo nano /etc/ansible/hosts
sudo cat /etc/ansible/hosts
ansible all --list-hosts
ansible apacheweb --list-hosts
ansible all -m ping
man ansible
ansible apacheweb -s -m shell -m "yum installed | grep python"
ansible apacheweb -s -m shell -m "yum list installed | grep python"
ansible apacheweb -s -m shell -m 'yum list installed | grep python'
yum
yum list
yum --help
yum list --help
yum list installed
ansible apacheweb -s -m shell -a 'yum list installed | grep python'
man ansible
ansible all -s -m shell -a 'yum install telnet'
ansible all -s -m shell -a 'yum install telnet -y'
ansible all -s -m shell -a 'yum install lynx -y'
ansible apacheweb -s -m shell -a "cat /var/log/mymessages.log.out'


ansible apacheweb -s -m shell -a "cat /var/log/mymessages..asdfsdf.log.out'
ansible apacheweb -s -m shell -a "cat /var/log/mymessages.log.out'
cat /var/log/mymessages.log.out
sudo cat /var/log/mymessages.log.out
ansible apacheweb -s -m shell -a 'cat /var/log/mymessages.log.out'
ansible all -m ping
ansible appserver -m ping
ansible local -m setup | more
cd /tmp
ls
ll
ansible local -m setup --tree /tmp/facts
man ansible
man ansible-doc
man ansible-doc-setup
man ansible-doc
ll
cat /etc/ansible/hosts
cd /
ansible apacheweb -m setup -a "filter=ansible_*"
ansible apacheweb -m setup -a 'filter=ansible_architecture'
ansible apacheweb -m setup -a 'filter=ansible_distribution'
ansible apacheweb -m setup | grep distribution
ansible apacheweb -m setup -a 'filter=ansible_distribution_version'
ansible apacheweb -m setup -a 'filter=ansibledomain'
ansible apacheweb -m setup -a 'filter=ansible_domain'
ansible apacheweb -m setup -a 'filter=ansible_fqdn'
ansible apacheweb -m setup -a 'filter=ansible_interf'
ansible apacheweb -m setup -a 'filter=ansible_interfaces'
ansible apacheweb -m setup -a 'filter=ansible_kernel'
ansible apacheweb -m setup -a 'filter=ansible_memtotal_mb'
ansible apacheweb -m setup -a 'filter=ansible_memtotal_proc*'
ansible apacheweb -m setup -a 'filter=ansible__proc*'
ansible apacheweb -m setup -a 'filter=ansible_proc*'
ansible apacheweb -m setup -a 'filter=ansible_virt*'
exi
sudo echo "asd"
cat /etc/ansible/hosts
ansible apacheweb -s -m yum -a 'pkg=lynx state=installed update_cache=true'
ls
cd ~
ls
pwd
cd playbooks
ls
pwd
ls
pwd
cd ..
ls
mkdir Playbooks
ls
rm -rf playbooks
ls
cd Playbooks
ls
pwd
ls
pwd
ls
pwd
nano appserver.yml
ls
ansible-playbook -s appserver.yml
ls
pwd
cd ..
ls
cd Playbooks/
ls
nano appserver.yml 
ansible-playbook -s appserver.yml
nano appserver.yml 
nano vars.yml
nano appserver.yml 
ansible-playbook -s appserver.yml
nano appserver.yml 
ansible-playbook -s appserver.yml
ansible --version
ansible -version
ansible --version
exit
ansible --version
ls
cd Playbooks
ls
pwd
ls
pwd
ansible all --list-hosts
cat /etc/ansible/hosts
nano myfirstplaybook.yml
pw
pwd
ls
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ansible all --list-hosts
cat /etc/ansible/hosts
ll
mkdir conf
ls
cd conf
ls
pwd
ll
nano copyright.yml
nano webdefaults.yml
nano myfirstplaybook.yml
ls
pwd
cd ..
ls
nano myfirstplaybook.yml
ls
pwd
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ls
pwd
ansible-playbook myfirstplaybook.yml
ls
pwd
cd conf
ls
cd ..
ls
nano myfirstplaybook.yml
ls
pwd
ansible-playbook myfirstplaybook.yml
pwd
ls
nano myfirstplaybook.yml
ls
cd conf
ls
nano copyright.yml
ls
nano webdefaults.yml 
ls
cd ..
ls
ansible-playbook myfirstplaybook.yml
ls
nano myfirstplaybook.yml 
ls
pwd
ansible-playbook myfirstplaybook.yml
ansible-doc -l
ansible-doc -l | wc -l
ansible all --list-hosts
cat /etc/ansible/hosts
ls
pwd
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml
ansible-playbook myfirstplaybook.yml
ansible all --list-hosts
cat /etc/ansible/hosts
ls
pwd
rm myfirstplaybook.retry 
ls
pwd
ls
pwd
ls
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
exit
ansible all --list-hosts
cat /etc/ansible/hosts
sudo cat /etc/ansible/hosts
sudo nano /etc/ansible/hosts
ansible all --list-hosts
ls
cd ~
ls
pwd
mkdir Outline
cd Outline/
ls
nano webserver.txt
ls
ansible all --list-hosts
cat /etc/ansible/hosts
ls
pwd
cp webserver.txt webserver.yml
cd ..
ls
cd Outline/
ls
nano we
nano webserver.yml
ls
pwd
ansible-playbook webserver.yml --check
nano webserver.yml
ansible-playbook webserver.yml --check
nano webserver.yml
ansible-playbook webserver.yml --check
nano webserver.yml
ansible-playbook webserver.yml --check
ansible-playbook webserver.yml
nano webserver.yml
ansible-playbook webserver.yml
nano webserver.yml
ansible-playbook webserver.yml
nano webserver.yml
ansible-playbook webserver.yml
nano webserver.yml
ls
exit
ansible all --list-hosts
cat /etc/ansible/hosts
ls
cd Outline
ls
cp webserver.yml webserver.original
nano webserver.yml
ansible-playbook webserver.yml --check
nano webserver.yml
ansible-playbook webserver.yml
ansible-playbook webserver.yml --check
ansible-playbook webserver.yml
nano webserver.yml
ansible-playbook webserver.yml --check
nano webserver.yml
ansible-playbook webserver.yml --check
nano webserver.yml
ansible-playbook webserver.yml --check
ansible-playbook webserver.yml
nano webserver.yml
exit
ansible all --list-hosts
A
ansible all --list-hosts
cat /etc/ansible/hosts
ls
cd Playbooks/
ls
rm myfirstplaybook.retry 
ls
cd ..
ls
cd Outline/
ls
cd ..
ls
cd Playbooks/
ls
pwd
ls
nano myfirstplaybook.yml 
s
pwd
ls
pwd
ansible-playbook myfirstplaybook.yml --check
ansible-playbook myfirstplaybook.yml
ls
nano myfirstplaybook.yml
ansible-playbook myfirstplaybook.yml
ansible --version
ansible all --list-hosts
cat /etc/ansible/hosts
ls
rm myfirstplaybook.retry 
ls
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
ansible all --list-hosts
cat /etc/ansible/hosts
ls
cd config
ls
cd ..
ls
cd Playbooks/
ls
cd conf
ls
nano webdefaults.yml 
ls
cd ..
ls
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml
nano myfirstplaybook.yml 
ansible-playbook myfirstplaybook.yml 
ll
ls
cd ..
ls
cd Playbooks/
ls
touch lookup.csv
nano lookup.csv 
cat lookup.csv 
nano lookup.yml
ls
pwd
ls
pwd
ansible-playbook lookup.yml
nano lookup.yml
ls
nano lookup.csv
ansible-playbook lookup.yml
nano lookup.csv 
ansible-playbook lookup.yml
nano lookup.yml
ansible-playbook lookup.yml
nano lookup.yml
ansible-playbook lookup.yml
nano lookup.yml
ansible-playbook lookup.yml
which csvfile
ansible all --list-hosts
cat /etc/ansible/hosts
ls
pwd
cd Playbooks/
ls
nano runonce.yml
ansible-playbook runonce.yml
cat /etc/ansible/hosts
ansible all --list-hosts
ls
pwd
nano local.yml
ansible-playbook local.yml 
sudo yum remove telnet
ansible-playbook local.yml 
ansible-playbook -s local.yml 
ls
pwd
nano loop.yml
ansible-playbook loop.yml
git
sudo yum install git
ls
cd ..
ls
pwd
cd ..
ls
cd usr
ls
cd ..
ls
cd home
ls
cd user
ls
cd test
ls
cd ..
ls
git clone git@github.com:KTruong888/resources.git
sudo git clone git@github.com:KTruong888/resources.git
sudo git clone https://github.com/KTruong888/resources.git
ls
cd resources
ls
cd refs
ls
cd devOps/
ls
cd ansible
ls
pwd
cd ..
ls
cd ..
ls
cd ..
ls
cp test /home/resources/refs/devOps/ansible
ls
cd /home/resources/refs/devOps/ansible
ls
cd ..
ls
cd ..
ls
pwd
cp -r /home/test /home/resources/refs/devOps/ansible
