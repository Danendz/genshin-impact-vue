import { BannerTypes, WishItemRarity, EventGuaruntee } from "@/Enums/WishEnums";
import { IWishItemsList, IWishResponse, IWishItem } from "@/Interfaces/IWish";

abstract class GachaController {
    //pity
    private readonly event5StarPity: number = 90;
    private readonly event4StarPity: number = 10;

    //chances
    private readonly chanceToWin5StarCharacter: number = 0.6;
    private readonly chanceToWin4StarItem: number = 5.1;
    private readonly chanceToWin4Star: number = 2.55;
    private readonly softPity: number = 70;

    //guarantee 
    abstract isEvent5StarCharaceterGuaruntee: boolean;
    abstract isEvent5StarWeaponrGuaruntee: boolean;

    abstract isEvent4StarCharacerGuaruntee: boolean;
    abstract isEvent4StarWeaponGuaruntee: boolean;

    //user current pitty
    abstract user4StarPity: number;
    abstract user5StarPity: number;

    //banner type
    abstract bannerType: BannerTypes

    //items list
    abstract wishItemsList: IWishItemsList;

    //event index
    abstract characterEventIndex: number;

    //increasing chance
    private increasingChanceToWin5 = 0;

    //make one wish
    public makeOneWish(): IWishResponse {
        const randomWishNumber: number = this.getRandomNumber(100);
        this.addPity();
        if (this.user5StarPity >= this.softPity) this.increasingChanceToWin5 += 0.1
        if (this.user5StarPity === this.event5StarPity) return this.get5Star();
        if (this.user4StarPity === this.event4StarPity) return this.get4Star();
        return this.makeChoose(randomWishNumber);
    }

    //make ten wishes
    public makeWishes(pulls: number): IWishResponse[] {
        const result: IWishResponse[] = [];
        for (let i = 0; i < pulls; i++) {
            result.push(this.makeOneWish())
        }

        return result;
    }

    //getting random number without floor and with
    private getRandomNumber(randomSize: number, params?: 'floor'): number {
        if (params === 'floor') {
            return Math.floor(Math.random() * randomSize)
        }
        return Math.random() * randomSize
    }


    //adding pity after one wish
    private addPity(): void {
        this.user4StarPity += 1
        this.user5StarPity += 1
    }

    //making choose what to get
    private makeChoose(randomNum: number): IWishResponse {
        if (randomNum <= this.chanceToWin5StarCharacter + this.increasingChanceToWin5) return this.get5Star()
        if (randomNum <= this.chanceToWin4StarItem) return this.get4Star()
        else return this.get3Star()
    }

    //getting 5 star
    private get5Star(): IWishResponse {
        this.increasingChanceToWin5 = 0;
        this.user5StarPity = 0;
        const wishItemCharacter: IWishItem = {
            rarity: WishItemRarity.FIVE,
            itemsListEvent: this.wishItemsList.event5,
            eventGuaruntee: EventGuaruntee.FIVE_STAR_CHARACTER,
            eventIndex: this.characterEventIndex
        }
        const wishItemWeapon: IWishItem = {
            rarity: WishItemRarity.FIVE,
            itemsListEvent: this.wishItemsList.eventWeapon5,
            eventGuaruntee: EventGuaruntee.FIVE_STAR_WEAPON,
        }

        return this.getItem(wishItemCharacter, wishItemWeapon);
    }

    //getting 4 star
    private get4Star(): IWishResponse {
        this.user4StarPity = 0;
        const wishItemCharacter: IWishItem = {
            rarity: WishItemRarity.FOUR,
            itemsListEvent: this.wishItemsList.event4,
            eventGuaruntee: EventGuaruntee.FOUR_STAR_CHARACTER,
        }

        const wishItemWeapon: IWishItem = {
            rarity: WishItemRarity.FOUR,
            itemsListEvent: this.wishItemsList.eventWeapon4,
            eventGuaruntee: EventGuaruntee.FOUR_STAR_WEAPON,
        }

        return this.getItem(wishItemCharacter, wishItemWeapon)
    }

    //getting 3 star
    private get3Star(): IWishResponse {
        if (!this.wishItemsList.standart3) {
            throw new Error('Вы не указали 3-х звездочные предметы')
        }

        return this.getRandomItem(WishItemRarity.THREE, this.wishItemsList.standart3)
    }

    //getting random item based on rarity and list with items
    private getRandomItem(rarity: WishItemRarity, itemsList: string[]): IWishResponse {
        const randomNumber = this.getRandomNumber(itemsList.length, 'floor')
        const wishItem = itemsList[randomNumber]

        return this.createWishResponse(rarity, wishItem)
    }

    //creating wish response after getting item
    private createWishResponse(rarity: WishItemRarity, wishItem: string): IWishResponse {
        return {
            rarity,
            wishItem
        }
    }

    //getting item based on banner type
    private getItem(wishItemCharacter: IWishItem, wishItemWeapon: IWishItem): IWishResponse {
        const standartList: string[] = wishItemCharacter.rarity === WishItemRarity.FIVE ?
            this.wishItemsList.standart5 :
            this.wishItemsList.standart4;

        switch (this.bannerType) {
            case BannerTypes.STANDART:
                return this.getRandomItem(wishItemCharacter.rarity, standartList)
            case BannerTypes.EVENT:
                if (!wishItemCharacter.itemsListEvent) {
                    throw new Error('Event character not specified')
                }
                return this.getEventItem(wishItemCharacter)

            case BannerTypes.EVENT_WEAPON:
                if (!wishItemWeapon.itemsListEvent) {
                    throw new Error('Event weapons not specified')
                }
                return this.getEventItem(wishItemWeapon)
            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-case-declarations
                const _ = this.bannerType;
                throw new Error('Something goes wrong')
        }
    }

    //getting 50/50 event item
    private getEventItem(wishItem: IWishItem): IWishResponse {
        const itemsStandart: string[] = wishItem.rarity === WishItemRarity.FIVE ?
            this.wishItemsList.standart5 :
            this.wishItemsList.standart4

        const eventIndexOrRandomNum: number = wishItem.eventIndex ??
            this.getRandomNumber(wishItem.itemsListEvent.length, 'floor')

        if (this[wishItem.eventGuaruntee]) {
            this[wishItem.eventGuaruntee] = false;
            return this.createWishResponse(wishItem.rarity, wishItem.itemsListEvent[eventIndexOrRandomNum])
        }

        const randomNumber: number = this.getRandomNumber(10);
        if (randomNumber > 5) {
            this[wishItem.eventGuaruntee] = true;
            return this.getRandomItem(wishItem.rarity, itemsStandart)
        }

        return this.createWishResponse(wishItem.rarity, wishItem.itemsListEvent[eventIndexOrRandomNum])
    }

}

export class Wish extends GachaController {
    //user current event wish pity
    user4StarPity = 0;
    user5StarPity = 0;

    //guarantee
    isEvent5StarCharaceterGuaruntee = false;
    isEvent5StarWeaponrGuaruntee = false;

    isEvent4StarCharacerGuaruntee = false;
    isEvent4StarWeaponGuaruntee = false;

    constructor(
        public bannerType: BannerTypes,
        public wishItemsList: IWishItemsList,
        public characterEventIndex: number = 0) {
        super()
    }
}