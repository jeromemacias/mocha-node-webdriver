install:
	@echo "Installing Node dependencies"
	@npm install

test-local:
	./node_modules/.bin/mocha --compilers js:babel-register test/for_all_tests.js test/local_server/*_spec.js
