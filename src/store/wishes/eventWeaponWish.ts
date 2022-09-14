import { IWishState } from "@/Interfaces/IWish";
import { EventWeaponWishStore } from "@/Enums/StoreEnums";

export default {
    state: (): IWishState => ({
        [EventWeaponWishStore.STATE_TOTAL_WISHES]: 10
    }),
    getters: {

    },
    mutations: {
        setEventWeaponWishes(state: IWishState, value: number) {
            state[EventWeaponWishStore.STATE_TOTAL_WISHES] = value;
        }
    },
    actions: {
    }
}