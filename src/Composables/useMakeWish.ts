/* import { ErrorMessages } from "@/Enums/ErrorMessages";
import { BannerStore, EventWeaponWishStore, EventWishStore, PrimogemsStore, StandartWishStore, WishListStore } from "@/Enums/StoreEnums";
import { BannerTypes } from "@/Enums/WishEnums";
import { IWishItemsList, IWishResponse } from "@/Interfaces/IWish";
import { Wish } from "@/Systems/WishSystem";
import store from '@/store/index';

interface CurrentWish {
    setter: StandartWishStore.SET_TOTAL_WISHES
    | EventWishStore.SET_TOTAL_WISHES
    | EventWeaponWishStore.SET_TOTAL_WISHES,
    totalWishes: number
}

let currentWish: CurrentWish;

const useMakeWish = (): Record<string, (pulls: number) => IWishResponse[] | ErrorMessages> => {
    
    const currentBanner: BannerTypes = store
        .state[BannerStore.MODULE_NAME][BannerStore.STATE_CURRENT_BANNER]
    const primogems: number = store
        .state[PrimogemsStore.MODULE_NAME][PrimogemsStore.STATE_PRIMOGEMS]
    const wishList: IWishItemsList | null = store
        .state[WishListStore.MODULE_NAME][WishListStore.STATE_WISH_LIST]


    const makeWishes = (pulls: number): IWishResponse[] | ErrorMessages => {
        setCurrentWishByBannerType();
        const checkOut: void | ErrorMessages.NOT_ENOUGH_PULLS = checkOutWishes(pulls)
        if (checkOut === ErrorMessages.NOT_ENOUGH_PULLS) {
            return ErrorMessages.NOT_ENOUGH_PULLS;
        }
        if (wishList) {
            const letsWish = new Wish(currentBanner, wishList)
            return letsWish.makeWishes(pulls);
        }
        return ErrorMessages.NO_WISH_LIST
    }

    return { makeWishes }

}

const setCurrentWishByBannerType = (): void => {
    switch (currentBanner) {
        case BannerTypes.EVENT:
            currentWish = {
                setter: EventWishStore.SET_TOTAL_WISHES,
                totalWishes: store
                    .state[EventWishStore.MODULE_NAME][EventWishStore.STATE_TOTAL_WISHES]
            }
            break;
        case BannerTypes.EVENT_WEAPON:
            currentWish = {
                setter: EventWeaponWishStore.SET_TOTAL_WISHES,
                totalWishes: store
                    .state[EventWeaponWishStore.MODULE_NAME][EventWeaponWishStore.STATE_TOTAL_WISHES]
            }
            break;
        case BannerTypes.STANDART:
            currentWish = {
                setter: StandartWishStore.SET_TOTAL_WISHES,
                totalWishes: store
                    .state[StandartWishStore.MODULE_NAME][StandartWishStore.STATE_TOTAL_WISHES]
            }
            break;
        default:
            throw new Error('Вы тут не должны быть')
    }
}

const checkOutWishes = (pulls: number): void | ErrorMessages.NOT_ENOUGH_PULLS => {
    const wishesAmount: number = currentWish.totalWishes;
    if (wishesAmount >= pulls) {
        store.commit(currentWish.setter, wishesAmount - pulls)
        return;
    }
    const remainderPullsInPrimogems: number = (pulls - wishesAmount) * 160;
    if (remainderPullsInPrimogems > primogems) {
        return ErrorMessages.NOT_ENOUGH_PULLS;
    }
    store.commit(currentWish.setter, 0)
    store.commit(PrimogemsStore.SET_PRIMOGEMS, primogems - remainderPullsInPrimogems)
}

export default useMakeWish */