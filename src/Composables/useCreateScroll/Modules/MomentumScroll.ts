//types
import { ScrollDirections } from "../Types/DirectionsType";

//modules
import { BounceScrollEffect } from "./BounceScrollEffect";
import { ScrollProps } from "./ScrollProps";

export class UseMomentumScroll {
	public momentumID = 0;
	private readonly PARENT_ELEMENT: HTMLElement
	private readonly DIRECTION: ScrollDirections
	private readonly START_MOMENTUM_FROM = 6
	public velX = 0;

	constructor(
		private scrollProps: ScrollProps,
		private bounce: BounceScrollEffect
	) {
		this.PARENT_ELEMENT = scrollProps.PARENT_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION

	}

	public beginMomentumTracking() {
		this.cancelMomentumTracking();
		if (this.velX > this.START_MOMENTUM_FROM || this.velX < -this.START_MOMENTUM_FROM) {
			this.momentumID = requestAnimationFrame(this.momentumLoop);
		}
	}

	private momentumLoop = () => {
		if (this.scrollProps.isStartOrEnd()) {
			this.bounce.afterScrollingBounce(this.velX)
			return;
		}

		this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] += this.velX; // Apply the velocity to the scroll position

		this.velX *= 0.95; // Slow the velocity slightly

		if (Math.abs(this.velX) > 0.5) { // Still moving?
			this.momentumID = requestAnimationFrame(this.momentumLoop); // Keep looping 
		}
	}

	public cancelMomentumTracking() {

		cancelAnimationFrame(this.momentumID);
	}
}

