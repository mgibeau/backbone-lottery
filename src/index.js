require('./appData');

var MainView = require('./views/main'),
    StateView = require('./views/state'),
    ResultsView = require('./views/results');

var App = new Marionette.Application();

App.addRegions({
    mainRegion: '[data-region-main]',
    stateRegion: '[data-region-state]',
    resultsRegion: '[data-region-results]'
});

App.addInitializer(function () {
    Backbone.history.start();
});

App.mainRegion.show(new MainView());
App.stateRegion.show(new StateView());
App.resultsRegion.show(new ResultsView());