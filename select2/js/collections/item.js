(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var $ = global.$
    , Backbone = global.Backbone
    , ItemModel = global.ItemModel;

  global.ItemCollection = Backbone.Collection.extend({
    model: ItemModel
  , initialize: function () {
      this._selected = null;
    }
  , params: {
      limit: 20
    , 'filter[fields][type]': 'comment'
    , 'sortby': 'create_ts desc'
    }
  , url: function () {
      return 'http://api.thriftdb.com/api.hnsearch.com/items/_search?' + $.param(this.params) + '&callback=?';
    }
  , parse: function (res) {
      return res.results;
    }
  , toVerboseJSON: function () {
      return this.map(function (model) {
        return model.toVerboseJSON();
      });
    }
  , select: function (id, options) {
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
    }
  , deselect: function () {
      if (!this._selected) return;
      this.trigger('deselect', this._selected);
      this._selected = null;
      return this;
    }
  });

})(this);