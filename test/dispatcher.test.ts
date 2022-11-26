/* eslint-disable max-nested-callbacks */
import EventFirer from "../src/EventFirer";
import { expect } from "chai";

let tmpEventOnTest: any, tmpEventAll: any, tmpEventfilt: any;
const dispatcher = new EventFirer();

function onTest(event: any) {
	tmpEventOnTest = event;
	it('should be called "on": ', function () {
		tmpEventOnTest.should.have.property("times", Infinity);
		tmpEventOnTest.should.have.property("target", 123);
		tmpEventOnTest.should.have.property("eventKey", "test");
	});
}

function onceTest2(event: any) {
	tmpEventOnTest = event;
	it('should be called "on": ', function () {
		tmpEventOnTest.should.have.property("times", Infinity);
		tmpEventOnTest.should.have.property("target", 123);
		tmpEventOnTest.should.have.property("eventKey", "test");
	});
}

function onceTest2B(event: any) {
	tmpEventOnTest = event;
	it('should be called "on": ', function () {
		tmpEventOnTest.should.have.property("times", Infinity);
		tmpEventOnTest.should.have.property("target", 123);
		tmpEventOnTest.should.have.property("eventKey", "test");
	});
}

function onceTest2C(event: any) {
	tmpEventOnTest = event;
	it('should be called "on": ', function () {
		tmpEventOnTest.should.have.property("times", Infinity);
		tmpEventOnTest.should.have.property("target", 123);
		tmpEventOnTest.should.have.property("eventKey", "test");
	});
}

describe("normal event listener", function () {
	it('test chain "on": ', function () {
		expect(dispatcher.on("test", onTest)).to.equal(dispatcher);
	});

	it('test chain "all": ', function () {
		expect(
			dispatcher.all(function (event: any) {
				tmpEventAll = event;
				it('should be called "all": ', function () {
					tmpEventAll.should.have.property("times", Infinity);
					tmpEventAll.should.have.property("target", 123);
					tmpEventAll.should.have.property("eventKey", "test");
				});
			})
		).to.equal(dispatcher);
	});

	it('test chain "filt": ', function () {
		expect(
			dispatcher.filt(
				(eventKey: any, event: any) => {
					it("should be called: ", function () {
						eventKey.should.be.equal("test");
						event.should.have.property("target", 123);
					});

					return true;
				},
				function (event: any) {
					tmpEventfilt = event;
					it('should be called "filt": ', function () {
						tmpEventfilt.should.have.property("times", Infinity);
						tmpEventfilt.should.have.property("target", 1253);
						tmpEventfilt.should.have.property("eventKey", "test");
					});
				}
			)
		).to.equal(dispatcher);
	});

	it('test chain "filt": ', function () {
		expect(
			dispatcher.filt(
				(eventKey: any, event: any) => {
					it("should be called: ", function () {
						eventKey.should.be.equal("test");
						event.should.have.property("target", 123);
					});

					return false;
				},
				function (event: any) {
					tmpEventfilt = event;
					it('should be called "filt": ', function () {
						tmpEventfilt.should.have.property("times", Infinity);
						tmpEventfilt.should.have.property("target", 1253);
						tmpEventfilt.should.have.property("eventKey", "test");
					});
				}
			)
		).to.equal(dispatcher);
	});

	it('test chain "all": ', function () {
		expect(
			dispatcher.all((event: any) => {
				it("should be called: ", function () {
					event.should.have.property("target", 123);
				});

				return false;
			})
		).to.equal(dispatcher);
	});

	// ------------------

	it("dispatch a event", function () {
		expect(dispatcher.fire("test", 123)).to.equal(dispatcher);
	});

	it("off a event", function () {
		expect(dispatcher.off("test", onTest)).to.equal(dispatcher);
	});

	it("once a event", function () {
		expect(dispatcher.once("test2", onceTest2)).to.equal(dispatcher);
	});

	it("once a event", function () {
		expect(dispatcher.once("test2", onceTest2B)).to.equal(dispatcher);
	});

	it("once a event", function () {
		expect(dispatcher.once("test2", onceTest2C)).to.equal(dispatcher);
	});

	it("dispatch a event", function () {
		expect(dispatcher.fire("test2", 111)).to.equal(dispatcher);
	});

	it("dispatch a event", function () {
		expect(dispatcher.fire("test2", 111)).to.equal(dispatcher);
	});

	it("once a event", function () {
		expect(dispatcher.once("test2", onceTest2B)).to.equal(dispatcher);
	});

	it("clear a event", function () {
		expect(dispatcher.clearListenersByKey("test2")).to.equal(dispatcher);
	});

	it("clearAll", function () {
		expect(dispatcher.clearAllListeners()).to.equal(dispatcher);
	});

	it("once a event", function () {
		expect(dispatcher.once("test2", onceTest2C)).to.equal(dispatcher);
	});

	it("once a event", function () {
		expect(dispatcher.once("test2", onTest)).to.equal(dispatcher);
	});

	it("off a event", function () {
		expect(dispatcher.off("test2", onTest)).to.equal(dispatcher);
	});

	it("off a event", function () {
		expect(dispatcher.off("xyz", onTest)).to.equal(dispatcher);
	});

	it("not listened", function () {
		expect(dispatcher.fire("abc", 123)).to.equal(dispatcher);
	});

	const dispatcher2 = new EventFirer();

	dispatcher2.eventKeyList = ["hello"];

	it("not listened", function () {
		expect(dispatcher2.checkEventKeyAvailable("hello")).to.equal(true);
		expect(dispatcher2.checkEventKeyAvailable("hello2")).to.equal(false);

		expect(dispatcher2.fire("hello", 123)).to.equal(dispatcher2);
		expect(dispatcher2.fire("hello2", 123)).to.equal(dispatcher2);

		expect(dispatcher2.on("hello", () => {})).to.equal(dispatcher2);
		expect(dispatcher2.on("hello2", () => {})).to.equal(dispatcher2);
	});
});

describe("off event when fire", function () {
	let c = 0;

	class Test extends EventFirer {
		public start = () => {
			this.fire("aaa", { message: "aaa" });

			return c;
		};
	}

	const car = new Test();

	const on1 = () => {
		c++;
	};

	const on2 = () => {
		c++;
		car.off("aaa", on2);
	};

	const on3 = () => {
		c++;
	};

	car.on("aaa", on1);
	car.on("aaa", on2);
	car.on("aaa", on3);

	it("not listened", function () {
		expect(car.start()).to.equal(3);
	});
});

describe("fire and on multi events", function () {
	let c = 0;

	class Test extends EventFirer {
		public start = () => {
			this.fire(["aaa", "bbb"]);

			return c;
		};
	}

	const car = new Test();

	const on1 = () => {
		c++;
	};

	const on2 = () => {
		c++;
	};

	car.on("aaa", on1);
	car.on("bbb", on2);

	it("fire 2 events", function () {
		expect(car.start()).to.equal(2);
	});

	const car2 = new Test();

	it("listen 2 events", function () {
		c = 0;
		car2.on(["aaa", "bbb"], on1);
		expect(car2.start()).to.equal(2);
	});
});
