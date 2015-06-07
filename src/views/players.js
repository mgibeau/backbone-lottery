var PlayerItemView = require('./playerItem');
var PlayerItemEmptyView = require('./playerItemEmpty');

module.exports = Marionette.CollectionView.extend({
    tagName: 'ul',

    className: 'list-group',

    childView: PlayerItemView,

    emptyView: PlayerItemEmptyView
});