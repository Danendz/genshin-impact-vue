import { WishListStore } from "@/Enums/StoreEnums";
import { IWishItemsList } from "@/Interfaces/IWish";


export interface WishListState {
    wishList: IWishItemsList | null
}

export default {
    state: (): WishListState => ({
        [WishListStore.STATE_WISH_LIST]: null
    }),
    getters: {

    },
    mutations: {
        setWishList(state: WishListState, value: IWishItemsList) {
            state[WishListStore.STATE_WISH_LIST] = value;
        }
    },
    actions: {
    }
}