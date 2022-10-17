import { ScrollDirections } from "../Types/DirectionsType";
import { BounceScrollEffect } from "./BounceScrollEffect";
import { UseMomentumScroll } from "./MomentumScroll";
import { ScrollProps } from "./ScrollProps";
import { Ref } from 'vue'

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
	private readonly PARENT_ELEMENT: HTMLElement;
	private readonly DIRECTION: ScrollDirections

	constructor(
		private scrollProps: ScrollProps,
		private bounceScroll: BounceScrollEffect,
		private momentumScroll: UseMomentumScroll,
		private isScrolling: Ref<boolean>
	) {
		this.HTML_ELEMENT = scrollProps.HTML_ELEMENT
		this.PARENT_ELEMENT = scrollProps.PARENT_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION
		this.SCROLL_WIDTH_OR_HEIGHT = scrollProps.SCROLL_WIDTH_OR_HEIGHT

		this.HTML_ELEMENT.style.overflowX = 'hidden'
		this.HTML_ELEMENT.style.overflowY = 'hidden'

		const direction = scrollProps.USER_DIR === 'vertical' ? 'Y' : 'X'
		this.PARENT_ELEMENT.style.overflow = 'hidden'
		this.PARENT_ELEMENT.style[`overflow${direction}`] = 'scroll'
		this.PARENT_ELEMENT.style.overscrollBehavior = 'contain'

	}

	private isTouch = (e: MouseEvent | TouchEvent): e is TouchEvent => {
		return (e as TouchEvent).touches !== undefined
	}

	private mouseDownHandler = (e: MouseEvent | TouchEvent) => {

		if (!this.isTouch(e)) {
			const clientDir = e[this.DIRECTION.clientDirection]
			this.pos = {
				dir: this.PARENT_ELEMENT[this.DIRECTION.scrollDirection],
				clientDir
			}
		}

		this.HTML_ELEMENT.addEventListener('mousemove', this.mouseMoveHandler, { passive: true })
		this.HTML_ELEMENT.addEventListener('touchmove', this.touchMoveHandler, { passive: true })
		this.HTML_ELEMENT.addEventListener('mouseup', this.mouseUpHandler, { passive: true })
		this.HTML_ELEMENT.addEventListener('touchend', this.mouseUpHandler, { passive: true })
		this.HTML_ELEMENT.addEventListener('mouseleave', this.mouseUpHandler, { passive: true })
	}

	private touchMoveHandler = (event: TouchEvent) => {

		const eventMove = event.touches[0][this.DIRECTION.clientDirection]

		if (this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] == 0 || this.scrollProps.isScrollEnd()) {
			this.manualBounce(eventMove)
		} else {
			this.mouseUpHandler()
		}

	}

	private mouseMoveHandler = (event: MouseEvent) => {
		this.momentumScroll.cancelMomentumTracking();
		this.isScrolling.value = true
		const eventMove = event[this.DIRECTION.clientDirection]

		this.scrollProps.dir = eventMove - this.pos.clientDir
		this.prevScrollLeft = this.PARENT_ELEMENT[this.DIRECTION.scrollDirection]
		this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] = this.pos.dir - this.scrollProps.dir

		this.momentumScroll.velX = this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] - this.prevScrollLeft
		if (this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] == 0 || this.scrollProps.isScrollEnd()) {
			this.manualBounce(eventMove)
		}
	}

	private manualBounce(eventMove: number) {

		if (this.prevEventScroll === 0) this.prevEventScroll = eventMove
		this.scrollProps.dir = eventMove - this.prevEventScroll
		this.bounceScroll.bounce()
	}

	private mouseUpHandler = () => {
		this.isScrolling.value = false
		this.bounceScroll.cancelBounce()
		this.removeEventListeners()
		this.prevEventScroll = 0

		if (this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] !== 0 && !this.scrollProps.isScrollEnd()) {
			this.momentumScroll.beginMomentumTracking();
		}
	}

	private removeEventListeners() {
		this.HTML_ELEMENT.removeEventListener('mousemove', this.mouseMoveHandler)
		this.HTML_ELEMENT.removeEventListener('touchmove', this.touchMoveHandler)
		this.HTML_ELEMENT.removeEventListener('mouseup', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('touchend', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('touchcancel', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('mouseleave', this.removeEventListeners)
	}

	public resetListeners() {
		this.removeEventListeners()
		this.HTML_ELEMENT.removeEventListener('mousedown', this.mouseDownHandler)
		this.HTML_ELEMENT.removeEventListener('touchstart', this.mouseDownHandler)
	}

	public scrollCreate() {
		this.HTML_ELEMENT.addEventListener('mousedown', this.mouseDownHandler)
		this.HTML_ELEMENT.addEventListener('touchstart', this.mouseDownHandler)
	}
}