var ResultItemView = require('./resultItem');

module.exports = Marionette.CollectionView.extend({
    childView: ResultItemView,

    collection: AppData.results
});