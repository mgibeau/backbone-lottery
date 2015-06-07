var numeral = require('numeral');

var ResultItemTemplate = require('../templates/resultItem.hbs');

module.exports = Marionette.ItemView.extend({
    className: 'col-md-4',

    template: ResultItemTemplate,

    initialize: function() {
        // Re-render the view when the model changes
        this.listenTo(this.model, 'change', this.render);
    },

    onBeforeRender: function() {
        // Add the ordinal value for display purposes
        this.model.set('ordinal', numeral(this._index + 1).format('0o'));
    }
});