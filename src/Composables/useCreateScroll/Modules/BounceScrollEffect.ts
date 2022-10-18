//types
import { ScrollDirections } from "../Types/DirectionsType";

//modules
import { ScrollProps } from "./ScrollProps";

export class BounceScrollEffect {
	public readonly MAX_TRANSFORM_OFFSET = 200
	private readonly MAX_SPEED = 6;
	public initialScrollDirection = 0;
	private scrollSpeed = 0;
	private readonly INITIAL_TRANSFORM: string;
	private readonly HTML_ELEMENT: HTMLElement;
	private readonly DIRECTION: ScrollDirections;
	private readonly SCROLL_DIRECTION: 'X' | 'Y';
	private readonly OFFSET_WIDTH_OR_HIGHT: 'offsetHeight' | 'offsetWidth';

	constructor(
		private scrollProps: ScrollProps
	) {
		this.HTML_ELEMENT = scrollProps.HTML_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION
		this.SCROLL_DIRECTION = scrollProps.USER_DIR === 'vertical' ? 'Y' : 'X'
		this.OFFSET_WIDTH_OR_HIGHT = scrollProps.USER_DIR === 'vertical' ? 'offsetHeight' : 'offsetWidth'
		this.INITIAL_TRANSFORM = window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('transform')
	}

	public bounce(customSpeed?: number, transition?: string) {
		if (this.HTML_ELEMENT[this.OFFSET_WIDTH_OR_HIGHT] <= this.scrollProps.PARENT_ELEMENT[this.OFFSET_WIDTH_OR_HIGHT]) return;

		let paddingOff = 0;
		if (this.scrollProps.dir / this.MAX_SPEED > this.MAX_TRANSFORM_OFFSET) paddingOff = this.MAX_TRANSFORM_OFFSET
		else if (customSpeed && customSpeed > this.MAX_TRANSFORM_OFFSET) paddingOff = this.MAX_TRANSFORM_OFFSET

		else paddingOff = customSpeed ?? (this.scrollProps.dir / this.MAX_SPEED)

		this.HTML_ELEMENT.style.transition = transition ?? '0.0s';
		this.HTML_ELEMENT.style.transform = `translate${this.SCROLL_DIRECTION}(${paddingOff}px)`
	}

	public cancelBounce = () => {
		this.HTML_ELEMENT.style.transition = '0.4s'
		this.HTML_ELEMENT.style.transform = this.INITIAL_TRANSFORM
		this.scrollProps.dir = 0
	}

	public afterScrollingBounce = (velX: number) => {
		this.bounce(-velX)

		if (this.scrollProps.isScrollEnd()) {
			this.HTML_ELEMENT[this.DIRECTION.scrollDirection] = this.HTML_ELEMENT[this.scrollProps.SCROLL_WIDTH_OR_HEIGHT]
		}

		setTimeout(() => {
			this.cancelBounce()
			velX = 0;
		}, 100);
	}
	public wheelScrollBounce = (scrollDeltaValue: number) => {

		if (this.initialScrollDirection !== scrollDeltaValue) {
			this.initialScrollDirection = scrollDeltaValue
			return;
		}

		if (!this.scrollProps.isStartOrEnd()) return;

		if (scrollDeltaValue < 0) {
			this.bounce(20, '0.1s')
		} else {
			this.bounce(-20, '0.1s')
		}

		setTimeout(() => {
			this.cancelBounce()
		}, 100);
	}
}