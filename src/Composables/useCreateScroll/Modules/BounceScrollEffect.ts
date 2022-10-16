
import { ScrollDirections } from "../Types/DirectionsType";
import { ScrollProps } from "./ScrollProps";

export class BounceScrollEffect {
	public readonly MAX_TRANSFORM_OFFSET = 200
	private readonly INITIAL_TRANSFORM: string;
	private readonly HTML_ELEMENT: HTMLElement;
	private readonly DIRECTION: ScrollDirections;
	private readonly SCROLL_DIRECTION: 'X' | 'Y';

	constructor(
		private scrollProps: ScrollProps
	) {
		this.HTML_ELEMENT = scrollProps.HTML_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION
		this.SCROLL_DIRECTION = scrollProps.USER_DIR === 'vertical' ? 'Y' : 'X'

		this.INITIAL_TRANSFORM = window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('transform')
	}

	public bounce(customSpeed?: number) {
		let paddingOff = 0;
		if (this.scrollProps.dir / 7 > this.MAX_TRANSFORM_OFFSET) paddingOff = this.MAX_TRANSFORM_OFFSET
		else paddingOff = customSpeed ?? (this.scrollProps.dir / 7)
		this.HTML_ELEMENT.style.transition = '0.0s';
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

}