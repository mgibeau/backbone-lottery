var BallsCollection = require('../../src/collections/balls');

describe('Collections:', function() {
    describe('Balls', function() {
        var balls = new BallsCollection();

        it('should have 5 models', function() {
            balls.add([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);

            expect(balls.length).to.equal(5);
        });

        it('pickOne should be a function', function() {
            expect(balls.pickOne).to.be.a('function');
        });

        it('pickOne() should return an number', function() {
            expect(balls.pickOne()).to.be.a('number');
        });
    });
});