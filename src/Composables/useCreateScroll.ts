enum HorizontalScroll {
    scrollDirection = 'scrollLeft',
    clientDirection = 'clientX'
}

const useCreateScroll = <T extends HTMLElement>(htmlElement: T): void => {
    const direction: typeof HorizontalScroll = HorizontalScroll;

    let mouseMoveCallback: (event: MouseEvent) => void;

    const mousedownHolder = (e: MouseEvent) => {
        const pos = {
            dir: htmlElement[direction.scrollDirection],
            clientDir: e[direction.clientDirection],
        }
        mouseMoveCallback = (event: MouseEvent): void => {
            mouseMoveHandler(event, pos)
        }
        htmlElement.addEventListener('mousemove', mouseMoveCallback)
        htmlElement.addEventListener('mouseup', mouseUpHandler)
        htmlElement.addEventListener('mouseleave', mouseUpHandler)
        return pos
    }

    const mouseMoveHandler = (event: MouseEvent, pos?: Record<string, number>) => {
        if (pos) {
            const dir = event[direction.clientDirection] - pos.clientDir
            htmlElement[direction.scrollDirection] = pos.dir - dir
        }
    }
    const mouseUpHandler = () => {
        htmlElement.removeEventListener('mousemove', mouseMoveCallback)
        htmlElement.removeEventListener('mouseup', mouseUpHandler)
    }
    const scrollCreate = (): void => {
        htmlElement.addEventListener('mousedown', mousedownHolder)
    }
    scrollCreate();
}

export default useCreateScroll



/* const scrollDirectionsHolder = (): scrollDirection => {
    if (scrollTo === 'horizontal') {
        return HorizontalScroll
    }
    return VerticalScroll
}
const direction: scrollDirection = scrollDirectionsHolder()

const wheelHolder = (e: WheelEvent) => {
    e.preventDefault();
    htmlElement['scrollLeft'] += e.deltaY
}

let mouseMoveCallback: (event: MouseEvent) => void;

const mousedownHolder = (e: MouseEvent) => {
    const pos = {
        dir: htmlElement[direction.scrollDirection],
        clientDir: e[direction.clientDirection],
    }
    mouseMoveCallback = (event: MouseEvent): void => {
        mouseMoveHandler(event, pos)
    }
    htmlElement.addEventListener('mousemove', mouseMoveCallback)
    htmlElement.addEventListener('mouseup', mouseUpHandler)
    htmlElement.addEventListener('mouseleave', mouseUpHandler)
    return pos
}

const mouseMoveHandler = (event: MouseEvent, pos?: Record<string, number>) => {
    if (pos) {
        const dy = event[direction.clientDirection] - pos.clientDir
        htmlElement.scrollTop = pos.dir - dy
    }
}
const mouseUpHandler = () => {
    htmlElement.removeEventListener('mousemove', mouseMoveCallback)
    htmlElement.removeEventListener('mouseup', mouseUpHandler)
}

const scrollCreate = (): void => {
    htmlElement.addEventListener('wheel', wheelHolder)
    htmlElement.addEventListener('mousedown', mousedownHolder)
}
const clearEvents = (): void => {
    htmlElement.removeEventListener('wheel', wheelHolder)
    htmlElement.removeEventListener('mousedown', mousedownHolder)
    htmlElement.removeEventListener('mousemove', mouseMoveCallback)
    htmlElement.removeEventListener('mouseup', mouseUpHandler)
    htmlElement.removeEventListener('mouseleave', mouseUpHandler)
}
clearEvents()
scrollCreate()
} */


/* const addHorizontalScroll = () => {
    if (characters_scroll.value) {

        characters_scroll.value?.replaceWith(characters_scroll.value.cloneNode(true))
        characters_scroll.value.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (characters_scroll.value) {
                characters_scroll.value.scrollLeft += e.deltaY
            }
        })
        characters_scroll.value.addEventListener('mousedown', (e) => {
            if (characters_scroll.value) {
                const pos = {
                    left: characters_scroll.value.scrollLeft,
                    x: e.clientX,
                }
                const mouseMoveHandler = (event: MouseEvent) => {
                    const dx = event.clientX - pos.x
                    if (characters_scroll.value) {
                        characters_scroll.value.scrollLeft = pos.left - dx
                    }
                }
                const mouseUpHandler = () => {
                    if (characters_scroll.value) {
                        characters_scroll.value.removeEventListener('mousemove', mouseMoveHandler)
                        characters_scroll.value.removeEventListener('mouseup', mouseUpHandler)
                    }
                }
                characters_scroll.value.addEventListener('mousemove', mouseMoveHandler)
                characters_scroll.value.addEventListener('mouseup', mouseUpHandler)
                characters_scroll.value.addEventListener('mouseleave', mouseUpHandler)
            }
        })
    }
}

const addVerticalScroll = () => {
    if (characters_scroll.value) {

        characters_scroll.value?.replaceWith(characters_scroll.value.cloneNode(true))
        characters_scroll.value.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (characters_scroll.value) {
                characters_scroll.value.scrollTop += e.deltaY
            }
        })
        characters_scroll.value.addEventListener('mousedown', (e) => {
            if (characters_scroll.value) {
                const pos = {
                    top: characters_scroll.value.scrollTop,
                    y: e.clientY,
                }
                const mouseMoveHandler = (event: MouseEvent) => {
                    const dy = event.clientY - pos.y
                    if (characters_scroll.value) {
                        characters_scroll.value.scrollTop = pos.top - dy
                    }
                }
                const mouseUpHandler = () => {
                    if (characters_scroll.value) {
                        characters_scroll.value.removeEventListener('mousemove', mouseMoveHandler)
                        characters_scroll.value.removeEventListener('mouseup', mouseUpHandler)
                    }
                }
                characters_scroll.value.addEventListener('mousemove', mouseMoveHandler)
                characters_scroll.value.addEventListener('mouseup', mouseUpHandler)
                characters_scroll.value.addEventListener('mouseleave', mouseUpHandler)
            }
        })
    }
} */
