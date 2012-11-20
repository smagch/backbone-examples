(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$
    , Backbone = global.Backbone;

  global.FilterView = Backbone.View.extend({
    initialize: function () {
      this.collection.on('hash', this.render, this);
    },
    events: {
      'click [data-type]': 'clicked'
    },
    clicked: function (e) {
      e.stopPropagation();
      var $target = $(e.currentTarget);
      var type = $target.attr('data-type');
      this.collection.params({ type: type });
    },
    render: function (collection, options) {
      console.log('render');
      var params = collection.params();
      this.$el.children('[data-type=' + params.type + ']')
        .addClass('active')
        .siblings('.active').removeClass('active');
    }
  });

})(this);