//modules
import { BounceScrollEffect } from "./BounceScrollEffect";
import { UseMomentumScroll } from "./MomentumScroll";
import { ScrollProps } from "./ScrollProps";

//types
import { ScrollDirections } from "../Types/DirectionsType";

//vue
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
	private readonly HTML_ELEMENT: HTMLElement;
	private readonly PARENT_ELEMENT: HTMLElement;
	private readonly DIRECTION: ScrollDirections
	private speedIncrease = 2;
	constructor(
		private scrollProps: ScrollProps,
		private bounceScroll: BounceScrollEffect,
		private momentumScroll: UseMomentumScroll,
		private isScrolling: Ref<boolean>
	) {
		this.HTML_ELEMENT = scrollProps.HTML_ELEMENT
		this.PARENT_ELEMENT = scrollProps.PARENT_ELEMENT
		this.DIRECTION = scrollProps.DIRECTION

		this.HTML_ELEMENT.style.overflowX = 'hidden'
		this.HTML_ELEMENT.style.overflowY = 'hidden'

		const direction = scrollProps.USER_DIR === 'vertical' ? 'Y' : 'X'

		this.PARENT_ELEMENT.style.overflow = 'hidden'
		this.PARENT_ELEMENT.style[`overflow${direction}`] = 'scroll'
		this.PARENT_ELEMENT.style.overscrollBehavior = 'contain'

	}

	private wheelHandler = (e: WheelEvent) => {
		this.momentumScroll.cancelMomentumTracking();

		if (this.isScrolling.value) {
			this.setDefault()
		}

		this.bounceScroll.wheelScrollBounce(e.deltaY)
	}



	private isTouch = (e: MouseEvent | TouchEvent): e is TouchEvent => {
		return (e as TouchEvent).touches !== undefined
	}

	private mouseDownHandler = (e: MouseEvent | TouchEvent) => {
		this.isScrolling.value = true
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

		if (this.scrollProps.isStartOrEnd()) {
			this.manualBounce(eventMove)
		} else {
			this.mouseUpHandler()
		}

	}

	private mouseMoveHandler = (event: MouseEvent) => {
		this.momentumScroll.cancelMomentumTracking();
		const eventMove = event[this.DIRECTION.clientDirection]

		this.scrollProps.dir = eventMove - this.pos.clientDir
		this.prevScrollLeft = this.PARENT_ELEMENT[this.DIRECTION.scrollDirection]
		this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] = this.pos.dir - this.scrollProps.dir

		this.momentumScroll.velX = this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] - this.prevScrollLeft
		if (this.scrollProps.isStartOrEnd()) {
			this.manualBounce(eventMove)
		}
	}

	private manualBounce(eventMove: number) {
		if (this.prevEventScroll === 0) this.prevEventScroll = eventMove
		this.scrollProps.dir = eventMove - this.prevEventScroll
		this.bounceScroll.bounce()
	}

	private mouseUpHandler = () => {
		this.setDefault()

		if (this.PARENT_ELEMENT[this.DIRECTION.scrollDirection] !== 0 && !this.scrollProps.isScrollEnd()) {
			this.momentumScroll.beginMomentumTracking();
		}
	}

	public setDefault() {
		this.isScrolling.value = false

		this.bounceScroll.cancelBounce()

		this.removeEventListeners()

		this.prevEventScroll = 0
	}

	public removeEventListeners() {
		this.HTML_ELEMENT.removeEventListener('mousemove', this.mouseMoveHandler)
		this.HTML_ELEMENT.removeEventListener('touchmove', this.touchMoveHandler)
		this.HTML_ELEMENT.removeEventListener('mouseup', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('touchend', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('touchcancel', this.mouseUpHandler)
		this.HTML_ELEMENT.removeEventListener('mouseleave', this.mouseUpHandler)
	}

	public resetListeners() {
		this.removeEventListeners()
		this.HTML_ELEMENT.removeEventListener('mousedown', this.mouseDownHandler)
		this.HTML_ELEMENT.removeEventListener('touchstart', this.mouseDownHandler)
	}

	public scrollCreate() {
		this.HTML_ELEMENT.addEventListener('wheel', this.wheelHandler, { passive: true })
		this.HTML_ELEMENT.addEventListener('mousedown', this.mouseDownHandler)
		this.HTML_ELEMENT.addEventListener('touchstart', this.mouseDownHandler)
	}
}