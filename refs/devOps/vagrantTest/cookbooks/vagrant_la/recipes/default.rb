execute "apt-get update"
package "nginx"
execute "rm -rf /usr/share/nginx/www"
link "/usr/share/nginx/www" do
  to "/vagrant"
end
