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
        .on('hash', this.hashChange, this);
      this.defaults = options.defaults;
    },
    hashChange: function (collection) {
      var params = collection.params();
      var hash = params.type + '/' + params.sort;
      this.navigate(hash);
    },
    update: function (type, sort) {
      var params = _.defaults({}, {
        type: type,
        sort: sort
      }, this.defaults);
      this.collection.params(params);
    }
  });

})(this);