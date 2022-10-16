import { Directions, ScrollDirections } from "../Types/DirectionsType"

import { HorizontalScroll, VerticalScroll } from "../Enums/ScrollEnums"

export class ScrollProps {
	public initialWidthOrHeight = 0;
	public dir = 0
	public readonly SCROLL_WIDTH_OR_HEIGHT: 'scrollHeight' | 'scrollWidth';
	public readonly DIRECTION: ScrollDirections;

	constructor(
		public readonly HTML_ELEMENT: HTMLElement,
		public readonly USER_DIR: Directions
	) {
		this.DIRECTION = USER_DIR === 'horizontal' ? HorizontalScroll : VerticalScroll
		this.SCROLL_WIDTH_OR_HEIGHT = this.DIRECTION.scrollDirection === 'scrollTop' ? 'scrollHeight' : 'scrollWidth'
	}

	public isScrollEnd() {
		const offsetDirection = this.DIRECTION.scrollDirection === 'scrollTop' ? 'offsetHeight' : 'offsetWidth'
		return this.HTML_ELEMENT[offsetDirection] + this.HTML_ELEMENT[this.DIRECTION.scrollDirection] >= this.initialWidthOrHeight
	}
}
