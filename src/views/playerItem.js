var PlayerItemTemplate = require('../templates/playerItem.hbs');

module.exports = Marionette.ItemView.extend({
    tagName: 'li',

    className: 'list-group-item',

    template: PlayerItemTemplate
});