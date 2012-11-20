(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var _ = global._,
    Backbone = global.Backbone;

  /**
   * Application Router
   *   #comment - show comments
   *   #submission - show submissions
   */

  global.AppRouter = Backbone.Router.extend({
    routes: {
      '': 'update',
      ':type': 'update'
    },
    initialize: function (options) {
      this.collection = options.collection
        .on('hash', this.hashChange, this);
      this.defaults = options.defaults;
    },
    hashChange: function (collection) {
      this.navigate(collection.params().type);
    },
    update: function (type) {
      var params = _.defaults({}, {
        type: type
      }, this.defaults);
      this.collection.params(params);
    }
  });

})(this);