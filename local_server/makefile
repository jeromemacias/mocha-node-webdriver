install:
	@npm install
	./node_modules/.bin/babel server.js --out-file build/server.js
	cp -R node_modules/koa node_modules/koa_es5
	./node_modules/.bin/babel node_modules/koa --out-dir node_modules/koa_es5 --compact false > /dev/null
	cp -R node_modules/koa_es5/ node_modules/koa/
	rm -rf node_modules/koa_es5
