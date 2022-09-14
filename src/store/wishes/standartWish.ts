import { IWishState } from "@/Interfaces/IWish";
import { StandartWishStore } from "@/Enums/StoreEnums";

export default {
    state: (): IWishState => ({
        [StandartWishStore.STATE_TOTAL_WISHES]: 10
    }),
    getters: {

    },
    mutations: {
        setStandartWishes(state: IWishState, value: number) {
            state[StandartWishStore.STATE_TOTAL_WISHES] = value;
        }
    },
    actions: {
    }
}