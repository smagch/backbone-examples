JSHINT_TARGETS = \
  $(shell find ./select/js -type file) \
  $(shell find ./select2/js -type file) \
  $(shell find ./filter/js -type file)

lint:
	@jshint --config ./fixtures/jshint-config.js $(JSHINT_TARGETS)
	@echo "lint ok"