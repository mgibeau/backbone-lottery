var PlayersView = require('./players');

var template = require('../templates/state.hbs');

module.exports = Marionette.LayoutView.extend({
    template: template,

    ui: {
        pot: '[data-ui-pot]'
    },

    regions: {
        players: '[data-region-players]'
    },

    initialize: function () {
        this.listenTo(AppData.pot, 'pot:increase', this.updatePot);
    },

    updatePot: function() {
        this.ui.pot.text(AppData.pot.getAvailable());
    },

    onShow: function () {
        var playersView = new PlayersView({collection: AppData.players});

        this.getRegion('players').show(playersView);

        this.updatePot();
    }
});