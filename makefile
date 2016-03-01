install:
	@echo "Installing Node dependencies"
	@npm install
	@echo "Installing Local server Node dependencies"
	@cd local_server && make install && cd ..

test-local:
	PM2_HOME='.pm2' ./node_modules/.bin/mocha --timeout 30000 --compilers js:babel-register test/setup.js test/local_server/*_spec.js
