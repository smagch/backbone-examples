(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var _ = global._,
    Backbone = global.Backbone;

  /**
   * Application Router
   *   # type
   *     - comment
   *     - submission
   *   # sort
   *     - create_ts
   *     - points
   *     - num_comments
   */

  global.AppRouter = Backbone.Router.extend({
    routes: {
      '': 'update',
      ':type': 'update',
      ':type/:sort': 'update'
    },
    initialize: function (options) {
      this.collection = options.collection
        .on('filter', this.hashChange, this);
      this.defaults = options.defaults;
    },
    hashChange: function (params) {
      var hash = params.type + '/' + params.sort;
      this.navigate(hash);
    },
    update: function (type, sort) {
      var params = _.defaults({}, {
        type: type,
        sort: sort
      }, this.defaults);
      this.collection.filter(params);
    }
  });

})(this);