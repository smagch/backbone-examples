(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$
    , _ = global._
    , Backbone = global.Backbone
    , ItemModel = global.ItemModel;

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
   */

  global.ItemCollection = Backbone.Collection.extend({
    model: ItemModel,
    initialize: function () {
      this._selected = null;
      this._params = {};
    },
    hasChange: function (params) {
      for (var key in params) {
        if (this._params[key] !== params[key]) {
          return true;
        }
      }
      return false;
    },
    params: function (obj, options) {
      // getter
      if (!obj) return _.clone(this._params);

      // balk if it obj has no changes
      if (!this.hasChange(obj)) return;

      // deselect if there is selection
      this.deselect();

      _.extend(this._params, obj);
      this.trigger('hash', this, options);
      return this.fetch(options);
    },
    url: function () {
      var params = {
        'filter[fields][type]': this._params.type,
        limit: 20,
        sortby: this._params.sort + ' desc'
      };

      return 'http://api.thriftdb.com/api.hnsearch.com/items/_search?'
        + $.param(params) + '&callback=?';
    },
    parse: function (res) {
      return res.results;
    },
    toVerboseJSON: function () {
      return this.map(function (model) {
        return model.toVerboseJSON();
      });
    },
    select: function (id, options) {
      var model = this.get(id);
      if (!model) throw new Error('invlid id : ' + id);

      // balk if when the modal is already selected
      if (this._selected === model) {
        return;
      }

      // selected model should be single
      if (this._selected) {
        this.deselect();
      }

      this._selected = model;
      this.trigger('select', model, options);
      return this;
    },
    deselect: function () {
      if (!this._selected) return;
      this.trigger('deselect', this._selected);
      this._selected = null;
      return this;
    }
  });

})(this);