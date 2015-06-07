var PotModel = require('../../src/models/pot');

describe('Models:', function() {
    describe('Pot', function() {
        var pot = new PotModel();

        it('should have a default value of <200>', function() {
            expect(pot.get('value')).to.equal(200);
        });

        it('available pot should be <100>', function() {
            expect(pot.getAvailable()).to.equal(100);
        });

        it('increasing should add 10', function() {
            pot.increase();
            expect(pot.get('value')).to.equal(210);
        });
    });
});