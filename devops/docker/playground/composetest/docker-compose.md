# Notes on using Docker Compose

<h4>Installation</h4>
<li>Install Docker (comes with Docker Engine)</li>
<li>Install Docker Compose @ https://github.com/docker/compose/releases (may need to run as a super user by executing 'sudo -i')</li>

<h4>Setup</h4>
<li>Create your app</li>
<li>Create a Dockerfile to define App's environment</li>
<li>Define services in a Compose file</li>
<li>Build and run your app with docker-compose up</li>
<li>.... and this is when I switched back to Docker on Mac</li>
<li>Currently having issues with VirtualBox and Docker Compose. Mounted files do not update properly. Tried multiple scenarios to work around, even editing, duplicating, then renaming and deleting file. Editing files is not feasible in these conditions. https://www.virtualbox.org/ticket/14920</li>
