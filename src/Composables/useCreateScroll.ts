import { BounceScrollEffect } from "./useCreateScroll/Modules/BounceScrollEffect";
import { ScrollProps } from "./useCreateScroll/Modules/ScrollProps";
import { UseMomentumScroll } from "./useCreateScroll/Modules/MomentumScroll";
import { CreateScroll } from "./useCreateScroll/Modules/CreateScroll";
import { Directions } from "./useCreateScroll/Types/DirectionsType";
import { ref } from "vue";

const useCreateScroll = () => {
    const isScrolling = ref(false);
    let htmlElemente: HTMLElement;
    let createScroll: CreateScroll;
    const createScrolling = <T extends HTMLElement>(htmlElement: T, userDir: Directions = 'horizontal') => {
        htmlElemente = htmlElement
        const scrollProps = new ScrollProps(htmlElement, userDir)
        const bounceScroll = new BounceScrollEffect(scrollProps)
        const momentumScroll = new UseMomentumScroll(scrollProps, bounceScroll)
        createScroll = new CreateScroll(scrollProps, bounceScroll, momentumScroll, isScrolling)

        htmlElement.addEventListener('wheel', () => {
            momentumScroll.cancelMomentumTracking(); // Stop the drag momentum loop
        }, {
            passive: true
        });
        createScroll.scrollCreate();
    }

    const resetListeners = () => {
        if (htmlElemente && createScroll) {
            createScroll.resetListeners();
        }
    }

    return { isScrolling, createScrolling, resetListeners }
}

export default useCreateScroll