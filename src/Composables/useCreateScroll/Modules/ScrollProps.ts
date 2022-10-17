//types
import { Directions, ScrollDirections } from "../Types/DirectionsType"

//enums
import { HorizontalScroll, VerticalScroll } from "../Enums/ScrollEnums"

export class ScrollProps {
	public initialWidthOrHeight = 0;
	public dir = 0
	public readonly SCROLL_WIDTH_OR_HEIGHT: 'scrollHeight' | 'scrollWidth';
	public readonly DIRECTION: ScrollDirections;
	public readonly PARENT_ELEMENT: HTMLElement

	constructor(
		public readonly HTML_ELEMENT: HTMLElement,
		public readonly USER_DIR: Directions
	) {
		this.DIRECTION = USER_DIR === 'horizontal' ? HorizontalScroll : VerticalScroll
		this.SCROLL_WIDTH_OR_HEIGHT = this.DIRECTION.scrollDirection === 'scrollTop' ? 'scrollHeight' : 'scrollWidth'
		this.PARENT_ELEMENT = HTML_ELEMENT.parentElement as HTMLElement

	}

	public isScrollEnd() {
		const offsetDirection = this.DIRECTION.scrollDirection === 'scrollTop' ? 'offsetHeight' : 'offsetWidth'
		return this.PARENT_ELEMENT[offsetDirection] + this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] >= this.PARENT_ELEMENT[this.SCROLL_WIDTH_OR_HEIGHT]
	}
}
