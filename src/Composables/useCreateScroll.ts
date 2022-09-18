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