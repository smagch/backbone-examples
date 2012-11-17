JSHINT_TARGETS = $(shell find ./select/js -type file)

lint:
	@jshint --config ./fixtures/jshint-config.js $(JSHINT_TARGETS)