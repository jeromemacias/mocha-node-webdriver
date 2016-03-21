.PHONY: test

install:
	@echo "Installing Node dependencies"
	@npm install
	@echo "Installing Selenium webdrivers"
	@./node_modules/.bin/webdriver-manager update --standalone=0
	@echo "Installing Local server Node dependencies"
	@cd local_server && make install && cd ..

test-local:
	PM2_HOME='.pm2' ./node_modules/.bin/mocha --timeout 30000 --compilers js:babel-register test/local_server/setup.js test/local_server/*_spec.js

test-remote:
	./node_modules/.bin/mocha --timeout 30000 --compilers js:babel-register test/remote_server/setup.js test/remote_server/*_spec.js

test:
	make test-local
	make test-remote
