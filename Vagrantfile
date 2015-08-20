# -*- mode: ruby -*-
# vi: set ft=ruby :

# Yves Hwang
# 20.08.2015

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8080, host: 18080
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    echo installing varnish cache
    sudo apt-get install apt-transport-https -y
    curl https://repo.varnish-cache.org/GPG-key.txt | sudo apt-key add -
    echo "deb https://repo.varnish-cache.org/ubuntu/ trusty varnish-4.0" | sudo tee -a /etc/apt/sources.list.d/varnish-cache.list
    sudo apt-get update
    sudo apt-get install varnish -y
    echo installing node env
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
    source /root/.profile
    nvm install v0.12.7
    nvm use v0.12.7
    npm -v
    node -v
  SHELL
end
