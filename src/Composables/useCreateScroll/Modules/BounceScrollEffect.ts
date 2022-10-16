import { IPaddingPos } from "../Interfaces/IPaddingPos";
import { ScrollDirections } from "../Types/DirectionsType";
import { ScrollProps } from "./ScrollProps";

export class BounceScrollEffect {
	public readonly MAX_PADDING_OFFSET = 200
	private readonly INITIAL_PADDING: string;
	private readonly INITIAL_PADDING_POS: IPaddingPos;
	private readonly HTML_ELEMENT: HTMLElement;
	private readonly DIRECTION: ScrollDirections;

	private paddingStartDirection: 'paddingTop' | 'paddingLeft'
	private paddingEndDirection: 'paddingBottom' | 'paddingRight'

	constructor(
		private scrollProps: ScrollProps
	) {
		this.HTML_ELEMENT = scrollProps.HTML_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION

		this.paddingStartDirection = this.DIRECTION.scrollDirection === 'scrollTop' ? 'paddingTop' : 'paddingLeft';
		this.paddingEndDirection = this.DIRECTION.scrollDirection === 'scrollTop' ? 'paddingBottom' : 'paddingRight';

		this.INITIAL_PADDING_POS = {
			'paddingTop': parseInt(window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('padding-top')),
			'paddingBottom': parseInt(window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('padding-bottom')),
			'paddingLeft': parseInt(window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('padding-left')),
			'paddingRight': parseInt(window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('padding-right')),
		}
		this.INITIAL_PADDING = window.getComputedStyle(this.HTML_ELEMENT, null).getPropertyValue('padding')
	}

	public bounce(customSpeed?: number) {
		let paddingDirection: typeof this.paddingStartDirection | typeof this.paddingEndDirection | null = null;

		if (this.HTML_ELEMENT[this.DIRECTION.scrollDirection] === 0) {
			paddingDirection = this.paddingStartDirection

		} else if (this.scrollProps.isScrollEnd()) {
			paddingDirection = this.paddingEndDirection
		}

		if (paddingDirection) {
			let paddingOff = this.INITIAL_PADDING_POS[paddingDirection] + Math.abs((customSpeed ?? (Math.abs(this.scrollProps.dir / 7))))

			if (paddingOff > this.MAX_PADDING_OFFSET) paddingOff = this.MAX_PADDING_OFFSET

			this.HTML_ELEMENT.style.transition = '0.0s';
			this.HTML_ELEMENT.style[paddingDirection] = `${paddingOff}px`
		}
	}

	public cancelBounce = () => {
		this.HTML_ELEMENT.style.transition = '0.2s'
		this.HTML_ELEMENT.style.padding = this.INITIAL_PADDING
		this.scrollProps.dir = 0
	}

	public afterScrollingBounce = (velX: number) => {
		this.bounce(velX)

		if (this.scrollProps.isScrollEnd()) {
			this.HTML_ELEMENT[this.DIRECTION.scrollDirection] = this.HTML_ELEMENT[this.scrollProps.SCROLL_WIDTH_OR_HEIGHT]
		}

		setTimeout(() => {
			this.cancelBounce()
			velX = 0;
		}, 100);
	}

}