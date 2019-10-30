import EventDispatcher from '../src/EventDispatcher';
import { expect, should } from 'chai';

describe('normal event listener', function () {

    let tmpEventOnTest, tmpEventAll, tmpEventFlit;
    const dispatcher = new EventDispatcher();
    function onTest (event) {
        tmpEventOnTest = event;
        it('should be called "on": ', function () {
            tmpEventOnTest.should.have.property('times', Infinity);
            tmpEventOnTest.should.have.property('target', 123);
            tmpEventOnTest.should.have.property('eventKey', 'test');
        });
    }

    function onceTest2 (event) {
        tmpEventOnTest = event;
        it('should be called "on": ', function () {
            tmpEventOnTest.should.have.property('times', Infinity);
            tmpEventOnTest.should.have.property('target', 123);
            tmpEventOnTest.should.have.property('eventKey', 'test');
        });
    }

    function onceTest2B (event) {
        tmpEventOnTest = event;
        it('should be called "on": ', function () {
            tmpEventOnTest.should.have.property('times', Infinity);
            tmpEventOnTest.should.have.property('target', 123);
            tmpEventOnTest.should.have.property('eventKey', 'test');
        });
    }

    function onceTest2C (event) {
        tmpEventOnTest = event;
        it('should be called "on": ', function () {
            tmpEventOnTest.should.have.property('times', Infinity);
            tmpEventOnTest.should.have.property('target', 123);
            tmpEventOnTest.should.have.property('eventKey', 'test');
        });
    }

    it('test chain "on": ', function () {
        expect(dispatcher.on('test', onTest)).to.equal(dispatcher);
    });

    it('test chain "all": ', function () {
        expect(dispatcher.all(function(event) {
            tmpEventAll = event;
            it('should be called "all": ', function () {
                tmpEventAll.should.have.property('times', Infinity);
                tmpEventAll.should.have.property('target', 123);
                tmpEventAll.should.have.property('eventKey', 'test');
            });
        })).to.equal(dispatcher);
    });

    it('test chain "flit": ', function () {
        expect(dispatcher.flit((eventKey, event) => {
            it('should be called: ', function () {
                eventKey.should.be.equal('test');
                event.should.have.property('target', 123);
            });
            return true;
        }, function(event) {
            tmpEventFlit = event;
            it('should be called "flit": ', function () {
                tmpEventFlit.should.have.property('times', Infinity);
                tmpEventFlit.should.have.property('target', 1253);
                tmpEventFlit.should.have.property('eventKey', 'test');
            });
        })).to.equal(dispatcher);
    });

    it('test chain "flit": ', function () {
        expect(dispatcher.flit((eventKey, event) => {
            it('should be called: ', function () {
                eventKey.should.be.equal('test');
                event.should.have.property('target', 123);
            });
            return false;
        }, function(event) {
            tmpEventFlit = event;
            it('should be called "flit": ', function () {
                tmpEventFlit.should.have.property('times', Infinity);
                tmpEventFlit.should.have.property('target', 1253);
                tmpEventFlit.should.have.property('eventKey', 'test');
            });
        })).to.equal(dispatcher);
    });

    // ------------------

    it('dispatch a event', function () {
        expect(dispatcher.dispatch('test', 123)).to.equal(dispatcher);
    });
    
    it('off a event', function () {
        expect(dispatcher.off('test', onTest)).to.equal(dispatcher);
    });

    it('once a event', function () {
        expect(dispatcher.once('test2', onceTest2)).to.equal(dispatcher);
    });

    it('once a event', function () {
        expect(dispatcher.once('test2', onceTest2B)).to.equal(dispatcher);
    });

    it('once a event', function () {
        expect(dispatcher.once('test2', onceTest2C)).to.equal(dispatcher);
    });

    it('dispatch a event', function () {
        expect(dispatcher.dispatch('test2', 111)).to.equal(dispatcher);
    });

    it('dispatch a event', function () {
        expect(dispatcher.dispatch('test2', 111)).to.equal(dispatcher);
    });

    it('once a event', function () {
        expect(dispatcher.once('test2', onceTest2B)).to.equal(dispatcher);
    });

    it('clear a event', function () {
        expect(dispatcher.clear('test2')).to.equal(dispatcher);
    });

    it('clearAll', function () {
        expect(dispatcher.clearAll()).to.equal(dispatcher);
    });

    it('once a event', function () {
        expect(dispatcher.once('test2', onceTest2C)).to.equal(dispatcher);
    });

    it('once a event', function () {
        expect(dispatcher.once('test2', onTest)).to.equal(dispatcher);
    });

    it('off a event', function () {
        expect(dispatcher.off('test2', onTest)).to.equal(dispatcher);
    });

    it('off a event', function () {
        expect(dispatcher.off('xyz', onTest)).to.equal(dispatcher);
    });

    it('not listened', function () {
        expect(dispatcher.dispatch('abc', 123)).to.equal(dispatcher);
    });


});