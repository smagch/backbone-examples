(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$
    , Backbone = global.Backbone;

  global.ItemView = Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template;
      this.collection
        .on('reset', this.render, this)
        .on('select', this.select, this)
        .on('deselect', this.deselect, this);
    }
  , events: {
      'click li': 'clicked'
    }
  , clicked: function (e) {
      var id = $(e.currentTarget).attr('data-id');
      this.collection.select(id);
      e.stopPropagation();
    }
  , get: function (id) {
      return this.$('[data-id=' + id + ']');
    }
  , select: function (model, options) {
      var $target = this.get(model.id);
      $target.addClass('selected');
    }
  , deselect: function (model) {
      var $target = this.get(model.id);
      $target.removeClass('selected');
    }
  , render: function (collection, options) {
      var json = collection.toVerboseJSON();
      var html = this.template({ models: json });
      this.$el.empty().html(html);
      return this;
    }
  });

})(this);