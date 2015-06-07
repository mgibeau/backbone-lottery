var _ = require('underscore');

var Ball = require('../models/ball');

module.exports = Backbone.Collection.extend({
    model: Ball,

    pickOne: function() {
        var randomBall = _.sample(this.models);

        this.remove(randomBall);

        return randomBall.get('id');
    }
});