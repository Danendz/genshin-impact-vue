import { ScrollDirections } from "../Types/DirectionsType";
import { BounceScrollEffect } from "./BounceScrollEffect";
import { UseMomentumScroll } from "./MomentumScroll";
import { ScrollProps } from "./ScrollProps";

interface IPos {
	dir: number,
	clientDir: number
}

export class CreateScroll {
	private pos: IPos = {
		dir: 0,
		clientDir: 0
	}

	private prevScrollLeft = 0;
	private prevEventScroll = 0;
	private readonly SCROLL_WIDTH_OR_HEIGHT: 'scrollHeight' | 'scrollWidth';
	private readonly HTML_ELEMENT: HTMLElement;
	private readonly DIRECTION: ScrollDirections

	constructor(
		private scrollProps: ScrollProps,
		private bounceScroll: BounceScrollEffect,
		private momentumScroll: UseMomentumScroll
	) {
		this.HTML_ELEMENT = scrollProps.HTML_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION
		this.SCROLL_WIDTH_OR_HEIGHT = scrollProps.SCROLL_WIDTH_OR_HEIGHT
	}


	private mouseDownHandler = (e: MouseEvent) => {

		if (this.scrollProps.initialWidthOrHeight === 0) {
			this.scrollProps.initialWidthOrHeight = this.HTML_ELEMENT[this.SCROLL_WIDTH_OR_HEIGHT]
		}

		this.pos = {
			dir: this.HTML_ELEMENT[this.DIRECTION.scrollDirection],
			clientDir: e[this.DIRECTION.clientDirection],
		}

		this.HTML_ELEMENT.addEventListener('mousemove', this.mouseMoveHandler)
		this.HTML_ELEMENT.addEventListener('mouseup', this.mouseUpHandler)
		this.HTML_ELEMENT.addEventListener('mouseleave', this.mouseUpHandler)
	}


	private mouseMoveHandler = (event: MouseEvent) => {
		this.momentumScroll.cancelMomentumTracking();
		this.scrollProps.dir = event[this.DIRECTION.clientDirection] - this.pos.clientDir
		this.prevScrollLeft = this.HTML_ELEMENT[this.DIRECTION.scrollDirection]
		this.HTML_ELEMENT[this.DIRECTION.scrollDirection] = this.pos.dir - this.scrollProps.dir
		this.momentumScroll.velX = this.HTML_ELEMENT[this.DIRECTION.scrollDirection] - this.prevScrollLeft

		if (this.HTML_ELEMENT[this.DIRECTION.scrollDirection] == 0 || this.scrollProps.isScrollEnd()) {
			if (this.prevEventScroll === 0) this.prevEventScroll = event[this.DIRECTION.clientDirection]
			this.scrollProps.dir = event[this.DIRECTION.clientDirection] - this.prevEventScroll
			this.bounceScroll.bounce()
		}
	}
	private mouseUpHandler = () => {
		this.bounceScroll.cancelBounce()
		this.removeEventListeners()
		this.prevEventScroll = 0

		if (this.HTML_ELEMENT[this.DIRECTION.scrollDirection] !== 0 && !this.scrollProps.isScrollEnd()) {
			this.momentumScroll.beginMomentumTracking();
		}
	}

	private removeEventListeners() {
		this.HTML_ELEMENT.removeEventListener('mousemove', this.mouseMoveHandler)
		this.HTML_ELEMENT.removeEventListener('mouseup', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('mouseleave', this.removeEventListeners)
	}

	public scrollCreate() {
		this.HTML_ELEMENT.addEventListener('mousedown', this.mouseDownHandler)
	}
}