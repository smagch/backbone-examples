(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$
    , _ = global._
    , Backbone = global.Backbone;

  /**
   * export JsonView
   */

  global.JsonView = Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template;
      this.collection
        .on('select', this.select, this)
        .on('deselect', this.deselect, this);
    },
    select: function (model, options) {
      var json = model.toJSON();
      json = JSON.stringify(json, null, 2);
      json = _.escape(json);
      this.$el.html('<pre><code>' + json + '</code></pre>');
    },
    deselect: function () {
      this.$el.empty();
    }
  });

})(this);