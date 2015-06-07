var ResultItemView = require('./resultItem');

module.exports = Marionette.CollectionView.extend({
    className: 'row',

    childView: ResultItemView,

    collection: AppData.results
});