import { WishItemRarity, EventGuaruntee, BannerTypes } from "@/Enums/WishEnums";

export interface IWishItemsList {
    event5: string[];
    event4: string[];
    eventWeapon4: string[];
    eventWeapon5: string[];
    standart5: string[];
    standart4: string[];
    standart3: string[];
}

export interface IWishResponse {
    rarity: number,
    wishItem: string
}

export interface IWishItem {
    rarity: WishItemRarity;
    itemsListEvent: string[];
    eventGuaruntee: EventGuaruntee;
    eventIndex?: number;
}

export interface IWishState {
    totalWishes: number
}