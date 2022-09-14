import { BannerStore } from "@/Enums/StoreEnums";
import { BannerTypes } from "@/Enums/WishEnums";

export interface BannerState {
    banner: BannerTypes
}

export default {
    state: (): BannerState => ({
        [BannerStore.STATE_CURRENT_BANNER]: BannerTypes.EVENT
    }),
    getters: {

    },
    mutations: {
        setCurrentBanner(state: BannerState, value: BannerTypes) {
            state[BannerStore.STATE_CURRENT_BANNER] = value;
        }
    },
    actions: {
    }
}