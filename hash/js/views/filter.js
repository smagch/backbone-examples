(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$
    , Backbone = global.Backbone;

  global.FilterView = Backbone.View.extend({
    initialize: function () {
      this.collection.on('filter', this.render, this);
    },
    events: {
      'click [data-type]': 'typeClicked',
      'click [data-sort]': 'sortClicked'
    },
    typeClicked: function (e) {
      e.stopPropagation();
      var $target = $(e.currentTarget);
      var type = $target.attr('data-type');
      this.collection.filter({ type: type });
    },
    sortClicked: function (e) {
      e.stopPropagation();
      var $target = $(e.currentTarget);
      var sort = $target.attr('data-sort');
      this.collection.filter({ sort: sort });
    },
    render: function (params, options) {
      this.$('[data-type=' + params.type + ']')
        .addClass('active')
        .siblings('.active').removeClass('active');
      this.$('[data-sort=' + params.sort + ']')
        .addClass('active')
        .siblings('.active').removeClass('active');
    }
  });

})(this);