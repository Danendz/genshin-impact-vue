import { IWishState } from "@/Interfaces/IWish";
import { EventWishStore } from "@/Enums/StoreEnums";


export default {
    state: (): IWishState => ({
        [EventWishStore.STATE_TOTAL_WISHES]: 10
    }),
    getters: {

    },
    mutations: {
        setEventWishes(state: IWishState, value: number) {
            state[EventWishStore.STATE_TOTAL_WISHES] = value;
        }
    },
    actions: {
    }
}