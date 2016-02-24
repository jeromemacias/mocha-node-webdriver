install:
	@echo "Installing Node dependencies"
	@npm install
	@echo "Installing Local server Node dependencies"
	@cd local_server && npm install && cd ..

test-local:
	./node_modules/.bin/mocha --compilers js:babel-register test/for_all_tests.js test/local_server/*_spec.js
