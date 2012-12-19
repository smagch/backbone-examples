
#
# install Node.js and `npm install`
#

JSHINT_BIN = ./node_modules/.bin/jshint
UGLIFYJS_BIN = ./node_modules/.bin/uglifyjs

#
# JavaScript lint targets
#

LINT_TARGETS = \
  $(shell find ./select/js -type file) \
  $(shell find ./select2/js -type file) \
  $(shell find ./filter/js -type file)

#
# JavaScript build
#

VENDOR_DIR = ./js/lib
FILTER_DIR = ./filter/js
JS_FINAL = $(FILTER_DIR)/app.js
JS_TARGETS = \
  $(VENDOR_DIR)/jquery.js \
  $(VENDOR_DIR)/underscore.js \
  $(VENDOR_DIR)/backbone.js \
  $(VENDOR_DIR)/lru-cache.js \
  $(FILTER_DIR)/models/item.js \
  $(FILTER_DIR)/collections/item.js \
  $(FILTER_DIR)/views/item.js \
  $(FILTER_DIR)/views/json.js \
  $(FILTER_DIR)/views/filter.js \
  $(FILTER_DIR)/routers/app.js \
  $(FILTER_DIR)/main.js

JS_TARGETS_MIN = $(JS_TARGETS:.js=.min.js)

lint: $(LINT_TARGETS)
	@$(JSHINT_BIN) --config ./fixtures/jshint-config.js $^
	@echo "lint ok"

build: $(JS_FINAL)
	@echo "built all"

%.min.js: %.js
	@$(UGLIFYJS_BIN) -m < $< > $@
	@echo "minified $<"

$(JS_FINAL): $(JS_TARGETS_MIN)
	@cat $^ > $@

clean:
	@rm $(JS_FINAL)

.INTERMEDIATE: $(JS_TARGETS_MIN)

.PHONY: clean lint