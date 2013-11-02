# launch server with supervisor

server:
	supervisor -e "coffee|less|js|node|twig" index.js

install:
	npm install
	
tests:
	mocha --reporter list --recursive -t 4000
	:

.PHONY: server