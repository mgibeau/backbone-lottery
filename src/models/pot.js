module.exports = Backbone.Model.extend({
    defaults: {
        // Declare an initial pot
        value: 200,
    },

    // Only a portion of the total pot is available to winners
    getAvailable: function() {
        return this.get('value') * 0.5;
    },

    increase: function() {
        this.set('value', this.get('value') + 10);
        this.trigger('pot:increase');
    }
});