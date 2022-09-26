enum HorizontalScroll {
    scrollDirection = 'scrollLeft',
    clientDirection = 'clientX'
}
enum VerticalScroll {
    scrollDirection = 'scrollTop',
    clientDirection = 'clientY'
}
type directions = 'horizontal' | 'vertical'
const useCreateScroll = <T extends HTMLElement>(htmlElement: T, userDir: directions = 'horizontal'): void => {

    let direction: typeof HorizontalScroll | typeof VerticalScroll = HorizontalScroll;
    if (userDir === 'vertical') {
        direction = VerticalScroll;
    }

    let mouseMoveCallback: (event: MouseEvent) => void;
    let velX: number;
    let momentumID: number;
    let prevScrollLeft: number;

    htmlElement.addEventListener('wheel', () => {
        cancelMomentumTracking(); // Stop the drag momentum loop
    }, {
        passive: true
    });

    const mousedownHolder = (e: MouseEvent) => {
        const pos = {
            dir: htmlElement[direction.scrollDirection],
            clientDir: e[direction.clientDirection],
        }
        mouseMoveCallback = (event: MouseEvent): void => {
            cancelMomentumTracking();
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
            prevScrollLeft = htmlElement[direction.scrollDirection]
            htmlElement[direction.scrollDirection] = pos.dir - dir
            velX = htmlElement[direction.scrollDirection] - prevScrollLeft
        }

    }
    const mouseUpHandler = () => {
        htmlElement.removeEventListener('mousemove', mouseMoveCallback)
        htmlElement.removeEventListener('mouseup', mouseUpHandler)
        if (velX >= 1.5 || velX <= -1.5) {
            beginMomentumTracking();
        }
    }
    function beginMomentumTracking() {
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
    }
    function cancelMomentumTracking() {
        cancelAnimationFrame(momentumID);
    }

    function momentumLoop() {
        htmlElement[direction.scrollDirection] += velX; // Apply the velocity to the scroll position
        velX *= 0.95; // Slow the velocity slightly
        if (Math.abs(velX) > 0.5) { // Still moving?
            momentumID = requestAnimationFrame(momentumLoop); // Keep looping 
        }
    }
    const scrollCreate = (): void => {
        htmlElement.addEventListener('mousedown', mousedownHolder)
    }
    scrollCreate();
}

export default useCreateScroll