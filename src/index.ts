import { EventFirer } from "./EventFirer";
import { fire } from "./decorators/fire";
import { on } from "./decorators/on";
export * from "./EventFirer";
export * from "./interfaces/IEventFirer";

export class A extends EventFirer {
	@on("aaa")
	public log(target: any): void {
		console.log(this, target);
	}

	@fire("aaa")
	public dispatch(): void {
		console.log("???");
	}
}
