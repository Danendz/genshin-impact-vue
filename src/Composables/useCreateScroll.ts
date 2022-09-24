enum HorizontalScroll {
    scrollDirection = 'scrollLeft',
    clientDirection = 'clientX'
}

const useCreateScroll = <T extends HTMLElement>(htmlElement: T): void => {
    const direction: typeof HorizontalScroll = HorizontalScroll;

    let mouseMoveCallback: (event: MouseEvent) => void;
    let velX: number;
    let momentumID: number;
    
    htmlElement.addEventListener('wheel', () => {
        cancelMomentumTracking(); // Stop the drag momentum loop
    });
    
    const mousedownHolder = (e: MouseEvent) => {
        const pos = {
            dir: htmlElement[direction.scrollDirection],
            clientDir: e[direction.clientDirection],
        }
        mouseMoveCallback = (event: MouseEvent): void => {
            mouseMoveHandler(event, pos)
        }
        cancelMomentumTracking();
        htmlElement.addEventListener('mousemove', mouseMoveCallback)
        htmlElement.addEventListener('mouseup', mouseUpHandler)
        htmlElement.addEventListener('mouseleave', mouseUpHandler)
        return pos
    }

    const mouseMoveHandler = (event: MouseEvent, pos?: Record<string, number>) => {
        if (pos) {
            const dir = event[direction.clientDirection] - pos.clientDir
            const prevScrollLeft = htmlElement.scrollLeft
            htmlElement[direction.scrollDirection] = pos.dir - dir
            velX = htmlElement.scrollLeft - prevScrollLeft
        }

    }
    const mouseUpHandler = () => {
        htmlElement.removeEventListener('mousemove', mouseMoveCallback)
        htmlElement.removeEventListener('mouseup', mouseUpHandler)
        beginMomentumTracking();
    }
    function beginMomentumTracking() {
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
    }
    function cancelMomentumTracking() {
        cancelAnimationFrame(momentumID);
    }

    function momentumLoop() {
        htmlElement.scrollLeft += velX; // Apply the velocity to the scroll position
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