(function (global) {
  'use strict';

  /**
   * Module Dependencies
   */

  var _ = global._
    , $ = global.$
    , Backbone = global.Backbone
    , ItemView = global.ItemView
    , JsonView = global.JsonView
    , FilterView = global.FilterView
    , AppRouter = global.AppRouter
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

  var buttonView = new FilterView({
    el: '#filter-view'
  , collection: itemCollection
  });

  var appRouter = new AppRouter({
    collection: itemCollection,
    defaults: {
      type: 'comment'
    , sort: 'create_ts'
    }
  });

  /**
   * deselect item when body clicked
   */

  $('body').on('click', function () {
    itemCollection.deselect();
  });

  /**
   * open link by tab
   */

  var openId = Math.random().toString();
  $('body').on('click', 'a[href^=http]', function (e) {
    var url = $(e.currentTarget).attr('href');
    e.preventDefault();
    e.stopPropagation();
    window.open(url, openId);
  });

  /**
   * Start Application
   */

  Backbone.history.start();

})(this);