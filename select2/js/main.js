(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var _ = global._
    , $ = global.$
    , ItemView = global.ItemView
    , JsonView = global.JsonView
    , ItemCollection = global.ItemCollection;

  /**
   * setup modules
   */

  var itemCollection = new ItemCollection();

  var itemView = new ItemView({
    el: '#item-view'
  , collection: itemCollection
  , template: _.template($('#item-template').html())
  });

  var jsonView = new JsonView({
    el: '#json-view'
  , collection: itemCollection
  });

  /**
   * deselect item when body clicked
   */

  $('body').on('click', function () {
    itemCollection.deselect();
  });

  /**
   * fetch items
   */

  itemCollection.fetch();

})(this);