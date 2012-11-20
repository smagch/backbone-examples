JSHINT_TARGETS = \
  $(shell find ./select/js -type file) \
  $(shell find ./select2/js -type file) \
  $(shell find ./hash/js -type file)

lint:
	@jshint --config ./fixtures/jshint-config.js $(JSHINT_TARGETS)