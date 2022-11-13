import { nextTick } from "vue"

export const useAutoScroll = (elementParent: HTMLElement, index: number, isScrollIntoView?: boolean) => {
	nextTick(() => {
		if (elementParent.children[index] && elementParent.parentElement) {
			elementParent.parentElement.style.scrollBehavior = 'smooth'
			const child = elementParent.children[index] as HTMLElement
			if (getComputedStyle(elementParent).flexDirection === 'column' || getComputedStyle(elementParent).display === 'grid') {
				if (isScrollIntoView) {
					elementParent.children[index].scrollIntoView({
						behavior: 'smooth',
						block: 'start',
						inline: 'start'
					})
				} else {
					elementParent.parentElement.scrollTop = child.offsetTop - parseInt(getComputedStyle(elementParent).gap, 10)
				}
			} else {
				elementParent.parentElement.scrollLeft = child.offsetLeft - parseInt(getComputedStyle(elementParent).gap, 10)
			}
		}
	})

}