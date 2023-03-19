/* eslint-disable max-nested-callbacks */
import { EventFirer, mixin } from "../src/EventFirer";
import { all, eventfirer, fire, on, once, times } from "../src/decorators";
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

@eventfirer
class A {
	public a = 0;
	@fire("aaa")
	public dispatch() {
		this.a = 1;

		return this.a;
	}

	@on("aaa")
	public log() {
		this.a = 2;

		return this.a;
	}
}

@eventfirer
class AA {
	public a = 0;
	public dispatch() {
		this.a = 1;

		return this.a;
	}

	public log() {
		this.a = 2;

		return this.a;
	}
}

class B {
	public a = 0;
	@fire("aaa")
	public dispatch() {
		this.a = 1;

		return this.a;
	}

	@all
	public dispatch2() {
		this.a = 1;

		return this.a;
	}

	@all
	public dispatch3() {
		this.a = 1;

		return this.a;
	}

	@on("aaa")
	public log() {
		this.a = 2;

		return this.a;
	}

	@on("bbb")
	public bLog() {
		this.a = 3;

		return this.a;
	}
}

describe("Decorators", function () {
	it("with eventfirer decorator", function () {
		const a = new A();

		const v = a.dispatch();

		expect(a.a).to.equal(2);
		expect(v).to.equal(1);
	});
	it("without eventfirer decorator", function () {
		const a = new B();

		a.dispatch();
		expect(a.a).to.equal(1);
	});
	it("without event", function () {
		const a = new AA();

		expect(a.a).to.equal(0);
	});

	it("times", function () {
		@eventfirer
		class AA {
			public a = 0;
			public b = 0;
			@times("a", 2)
			public add() {
				this.a++;
			}

			@times("a")
			public add2() {
				this.b++;
			}

			@fire("a")
			public dispatch() {}
		}
		const a = new AA();

		a.dispatch();
		a.dispatch();
		a.dispatch();

		expect(a.a).to.equal(2);
		expect(a.b).to.equal(3);
	});

	it("once", function () {
		@eventfirer
		class AA {
			public a = 0;
			@once("a")
			public add() {
				this.a++;
			}

			@fire("a")
			public dispatch() {}
		}
		const a = new AA();

		a.dispatch();
		a.dispatch();
		a.dispatch();

		expect(a.a).to.equal(1);
	});

	it("filt", function () {
		@eventfirer
		class AA {
			public a = 0;
			@all
			public add() {
				this.a++;
			}

			@fire("a")
			public dispatch() {}
		}
		const a = new AA();

		a.dispatch();
		a.dispatch();
		a.dispatch();

		expect(a.a).to.equal(3);
	});
});

describe("Mixin", function () {
	it("Mixin without class", function () {
		const A = mixin();
		const a = new A();

		expect(typeof a.on).to.equal("function");
	});
});

describe("Check duplicate", function () {
	it("Listen duplicate", function () {
		const a = new EventFirer();
		let n = 0;

		function add() {
			++n;
		}

		a.on("a", add, true);
		a.on("a", add, true);
		a.fire("a");

		expect(n).to.equal(1);
	});
	it("Listen duplicate2", function () {
		const a = new EventFirer();
		let n = 0;

		function add() {
			++n;
		}

		a.on("a", add, true);
		a.on(
			"a",
			() => {
				++n;
			},
			true
		);
		a.fire("a");

		expect(n).to.equal(2);
	});
	it("Filt duplicate", function () {
		const a = new EventFirer();
		let n = 0;

		function add() {
			++n;
		}

		a.all(add, true);
		a.all(add, true);
		a.fire("a");

		expect(n).to.equal(1);
	});

	it("Filt duplicate2", function () {
		const a = new EventFirer();
		let n = 0;

		function add() {
			++n;
		}

		a.all(add, true);
		a.filt(
			() => {
				return true;
			},
			add,
			true
		);
		a.fire("a");

		expect(n).to.equal(2);
	});
});
