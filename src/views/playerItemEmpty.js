var PlayerItemEmptyTemplate = require('../templates/playerItemEmpty.hbs');

module.exports = Marionette.ItemView.extend({
    tagName: 'li',

    className: 'list-group-item',

    template: PlayerItemEmptyTemplate
});