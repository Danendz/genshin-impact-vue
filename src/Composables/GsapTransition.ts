import gsap from "gsap"
import { IOptions } from "@/Interfaces/GsapTransitionOptions"

export const useGsapTransition = ({ beforeEnter, enter, leave }: IOptions, customIndex?: number) => {

	const onBeforeEnter = (el: Element) => {
		if (!beforeEnter) return;
		const element = el as HTMLElement
		for (const key in beforeEnter) {
			const keyCast = key as keyof typeof beforeEnter
			const option = beforeEnter[keyCast]?.toString()
			if (option) {
				element.style[keyCast] = option.toString()

			}
		}
	}

	const onEnter = (el: Element, done: () => void) => {
		const element = el as HTMLElement
		let delay = enter?.delay ?? 0
		if (customIndex) {
			delay += customIndex * 0.05
		}
		gsap.to(element, {
			opacity: enter?.opacity,
			duration: enter?.duration,
			transform: enter?.transform,
			position: enter?.position,
			delay: enter?.delay ?? delay,
			onComplete: done
		})
	}

	const onLeave = (el: Element, done: () => void) => {
		const element = el as HTMLElement

		gsap.to(element, {
			opacity: leave?.opacity,
			duration: leave?.duration,
			transform: leave?.transform,
			position: leave?.position,
			delay: leave?.delay,
			onComplete: done
		})
	}
	return { onBeforeEnter, onEnter, onLeave }
}