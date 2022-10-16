import { BounceScrollEffect } from "./useCreateScroll/Modules/BounceScrollEffect";
import { ScrollProps } from "./useCreateScroll/Modules/ScrollProps";
import { UseMomentumScroll } from "./useCreateScroll/Modules/MomentumScroll";
import { CreateScroll } from "./useCreateScroll/Modules/CreateScroll";
import { Directions } from "./useCreateScroll/Types/DirectionsType";

const useCreateScroll = <T extends HTMLElement>(htmlElement: T, userDir: Directions = 'horizontal'): void => {
    const scrollProps = new ScrollProps(htmlElement, userDir)
    const bounceScroll = new BounceScrollEffect(scrollProps)
    const momentumScroll = new UseMomentumScroll(scrollProps, bounceScroll)
    const createScroll = new CreateScroll(scrollProps, bounceScroll, momentumScroll)

    htmlElement.addEventListener('wheel', () => {
        momentumScroll.cancelMomentumTracking(); // Stop the drag momentum loop
    }, {
        passive: true
    });

    createScroll.scrollCreate();
}

export default useCreateScroll