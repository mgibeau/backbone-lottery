var numeral = require('numeral');

var Player = require('../models/player');

var template = require('../templates/main.hbs');

module.exports = Marionette.ItemView.extend({
    template: template,

    ui: {
        name: '[data-ui-name]',
        buyBtn: '[data-ui-buy]',
        drawBtn: '[data-ui-draw]',
        resultsBtn: '[data-ui-results]',
        error: '[data-ui-error]',
    },

    events: {
        'click @ui.buyBtn': 'onBuy',
        'click @ui.drawBtn': 'onDraw',
        'click @ui.resultsBtn': 'onResults'
    },

    initialize: function() {
        //
    },

    showError: function(msg) {
        this.ui.error.text(msg);
    },

    hideError: function() {
        this.ui.error.empty();
    },

    onBuy: function () {
        var playerName = this.ui.name.val(),
            pickedTicket,
            player;

        // Name is required
        if (playerName === '') {
            this.showError('Please enter a name');
            return;
        }

        // Can't buy tickets after a drawing was done
        if (AppData.results.length >= 3) {
            this.showError('Unable to sell tickets after a drawing');
            return;
        }

        // Clear errors
        this.hideError();

        // Pick a number
        pickedTicket = AppData.tickets.buyOne();

        // Check if tickets are available
        if (pickedTicket) {
            // Increase pot
            AppData.pot.increase();

            // Create a new player
            player = new Player({
                name: playerName,
                pickedNumber: pickedTicket.get('id')
            });

            // Add to collection
            AppData.players.add(player);
        } else {
            // No tickets left!
            this.showError('All tickets have been sold');
        }
    },

    onDraw: function() {
        // Don't proceed if no players have been registered
        if (AppData.players.length < 1) {
            this.showError('No players have been registered');
            return;
        }

        // Avoid drawing twice
        if (AppData.results.length >= 3) {
            this.showError('Drawing has been done already!');
            return;
        }

        // Clear errors
        this.hideError();

        // Pick 3 balls
        _.each([1, 2, 3], function () {
            AppData.results.add({ballNumber: AppData.balls.pickOne()});
        });

        // Show the hidden region
        $('[data-region-results]').removeClass('hidden');
    },

    onResults: function() {
        // Stop if no drawing has been done yet
        if (AppData.results.length === 0) {
            this.showError('No numbers have been drawn');
            return;
        }

        // Clear errors
        this.hideError();

        // Update the results
        AppData.results.each(function(model, idx) {
            var player = AppData.players.where({pickedNumber: model.get('ballNumber')});

            model.set('playerName', player[0] && player[0].get('name') || 'No winner');
            model.set('amount', numeral(AppData.pot.getAvailable() * AppData.payouts[idx]).format('0.00 $'));
        });
    }
});