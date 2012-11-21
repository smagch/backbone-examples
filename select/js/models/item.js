(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var Backbone = global.Backbone;

  global.ItemModel = Backbone.Model.extend({
    toVerboseJSON: function () {
      var json = this.toJSON();
      json.cid = this.cid;
      return json;
    },
    parse: function (data) {
      return data.item;
    }
  });

})(this);