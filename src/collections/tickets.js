var Ticket = require('../models/ticket');

module.exports = Backbone.Collection.extend({
    model: Ticket,

    buyOne: function() {
        var availableTickets = _.filter(this.models, function (model) {
            return !model.get('sold');
        });

        var randomTicket = _.sample(availableTickets);

        randomTicket && randomTicket.set('sold', true);

        return randomTicket || false;
    }
});