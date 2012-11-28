(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var Backbone = global.Backbone;

  global.ItemModel = Backbone.Model.extend({
    parse: function (data) {
      return data.item;
    }
  });

})(this);