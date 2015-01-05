define(function(require, exports, module) {
  'use strict';
  var d3            = require('d3/d3');
  var Engine        = require('famous/core/Engine');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var Scrollview    = require('famous/views/Scrollview');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ViewSequence  = require('famous/core/ViewSequence');
  var treeMapView   = require('treeMapView');

  var el = document.getElementById("charts");
  var mainContext = Engine.createContext(el);
  mainContext.setPerspective(500);


  var chartViews = [];
  var scrollview = new Scrollview({
      margin: 50
  });

  Engine.pipe(scrollview);

  var viewSequence = new ViewSequence({
      array: chartViews,
      loop: true
  });
  scrollview.sequenceFrom(viewSequence);

  var viewSize = [1000, 600];

  var centerModifier = new StateModifier({
    size: viewSize,
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  mainContext.add(centerModifier);
  
  d3.json('/trending', function (err, data) {
    mainContext.add(treeMapView(viewSize,data));
  });
});