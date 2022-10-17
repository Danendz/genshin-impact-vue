//modules
import { BounceScrollEffect } from "./useCreateScroll/Modules/BounceScrollEffect";
import { ScrollProps } from "./useCreateScroll/Modules/ScrollProps";
import { UseMomentumScroll } from "./useCreateScroll/Modules/MomentumScroll";
import { CreateScroll } from "./useCreateScroll/Modules/CreateScroll";

//types
import { Directions } from "./useCreateScroll/Types/DirectionsType";

//vue
import { ref } from "vue";

const useCreateScroll = () => {
    const isScrolling = ref(false);
    let globalHtmlElement: HTMLElement;
    let createScroll: CreateScroll;
    const createScrolling = <T extends HTMLElement>(htmlElement: T, userDir: Directions = 'horizontal') => {
        globalHtmlElement = htmlElement
        const scrollProps = new ScrollProps(htmlElement, userDir)
        const bounceScroll = new BounceScrollEffect(scrollProps)
        const momentumScroll = new UseMomentumScroll(scrollProps, bounceScroll)
        createScroll = new CreateScroll(scrollProps, bounceScroll, momentumScroll, isScrolling)

        htmlElement.addEventListener('wheel', () => {
            momentumScroll.cancelMomentumTracking();
            createScroll.removeEventListeners();
        }, {
            passive: true
        });
        createScroll.scrollCreate();
    }

    const resetListeners = () => {
        if (globalHtmlElement && createScroll) {
            createScroll.resetListeners();
        }
    }

    return { isScrolling, createScrolling, resetListeners }
}

export default useCreateScroll