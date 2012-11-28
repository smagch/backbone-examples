(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$,
    _ = global._,
    LRUCache = global.LRUCache,
    Backbone = global.Backbone,
    ItemModel = global.ItemModel;

  var types = {
    comment: 1,
    submission: 1
  };

  /**
   * Hacker News Item Collection
   *
   * parameters
   *   - type: "comment" or "submission"
   *   - sort: "create_ts" or "points" or "num_comments"
   *
   * Cache up to recently used 10 requests based of query parameter hash
   * You may want to use LocalStorage for caching
   * http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps
   *
   * In this case, it use Isaac Schlueter's lru-cache
   * https://github.com/isaacs/node-lru-cache
   *
   * For real HN app, you'll want to set `maxAge` option in LURCache
   * since HN Search API reject stale signedId
   *
   * Note: It won't work in old browsers since LRUCache uses `Object.defineProperty`
   */

  global.ItemCollection = Backbone.Collection.extend({
    model: ItemModel,
    initialize: function () {
      this._selected = null;
      this._params = {};
      this.cache = new LRUCache(10);
    },
    hasChange: function (params) {
      for (var key in params) {
        if (this._params[key] !== params[key]) {
          return true;
        }
      }
      return false;
    },
    filter: function (obj, options) {
      // balk if it obj has no changes
      if (!this.hasChange(obj)) return;
      // deselect if there is selection
      this.deselect();
      _.extend(this._params, obj);
      this.trigger('filter', _.clone(this._params), options);
      return this.fetch(options);
    },
    getFilterHash: function () {
      return $.param({
        'filter[fields][type]': this._params.type,
        limit: 20,
        sortby: this._params.sort + ' desc'
      });
    },
    url: function () {
      return 'http://api.thriftdb.com/api.hnsearch.com/items/_search?'
        + this.getFilterHash() + '&callback=?';
    },
    parse: function (res) {
      return res.results;
    },
    select: function (id, options) {
      var model = this.get(id);
      if (!model) throw new Error('invlid id : ' + id);
      // balk if when the modal is already selected
      if (this._selected === model) return;
      // selected model should be single
      if (this._selected) this.deselect();
      this._selected = model;
      this.trigger('select', model, options);
      return this;
    },
    deselect: function () {
      if (!this._selected) return;
      this.trigger('deselect', this._selected);
      this._selected = null;
      return this;
    },
    sync: function (method, model, options) {
      if (method !== 'read') {
        return Backbone.sync.call(this, method, model, options);
      }
      var self = this;
      var key = this.getFilterHash();
      var value = this.cache.get(key);
      var xhr;
      if (!value) {
        xhr = Backbone.sync.call(this, method, model, options);
        xhr.done(function (res, msg, xhr) {
          self.cache.set(key, res);
        });
        return xhr;
      }
      // perform psudo request
      xhr = $.Deferred();
      _.defer(function () {
        // this is always true if it's from `.fetch()` call
        if (options && typeof options.success === 'function') {
          options.success(value, 'success', xhr);
        }
        xhr.resolve(value, 'success', xhr);
      });
      return xhr.promise();
    }
  });

})(this);