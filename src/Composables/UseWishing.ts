import { BannerTypes } from "@/Enums/WishEnums";
import { Character } from "@/Interfaces/CharacterInterface";
import { Weapon } from "@/Interfaces/WeaponInterface";
import { ComputedRef } from "vue";

export type CharacterOrWeapon = Character | Weapon

export interface WishItems {
	standardFiveStars: CharacterOrWeapon[],
	standardFourStars: CharacterOrWeapon[],
	standardThreeStars: Weapon[],
	eventFiveStars?: CharacterOrWeapon[],
	eventFourStars?: CharacterOrWeapon[]
}

export interface IWishParams {
	userFiveStarPity: number,
	userFourStarPity: number,
	isFiveStarGuaruntee: boolean,
	isFourStarGuaruntee: boolean,
	wishItems: ComputedRef<WishItems>,
	bannerType: BannerTypes,
}


export class UseWishing {

	private pityFiveStar = 90;
	private readonly pityFourStar = 10;

	private readonly chanceToWinFiveStar = 0.6
	private readonly chanceToWinStandartFourStar: number = 5.1;
	private readonly chanceToWinEventFourStar: number = 2.55;
	private readonly softPity: number = 70;
	private readonly softPityIncreaseBy: number = 4.97

	private chanceFiveStarIncrease: number;
	private wishItems: ComputedRef<WishItems>;

	private randomNumber = 0;

	public readonly bannerType: BannerTypes;

	public isFiveStarGuaruntee: boolean;
	public isFourStarGuaruntee: boolean;

	public userFiveStarPity: number;
	public userFourStarPity: number;


	constructor({ userFiveStarPity, userFourStarPity, wishItems, bannerType, isFiveStarGuaruntee, isFourStarGuaruntee }: IWishParams, customFiveStarPity?: number) {
		this.userFiveStarPity = userFiveStarPity;
		this.userFourStarPity = userFourStarPity;

		this.wishItems = wishItems;
		this.bannerType = bannerType;

		this.isFiveStarGuaruntee = isFiveStarGuaruntee
		this.isFourStarGuaruntee = isFourStarGuaruntee

		this.chanceFiveStarIncrease = userFiveStarPity > 70 ? this.softPityIncreaseBy * (userFiveStarPity - 70) : 0

		if (customFiveStarPity) this.pityFiveStar = customFiveStarPity
	}

	public makeWishes(pulls: number, eventItemIndex?: number): CharacterOrWeapon[] {

		if (this.isWishItemsNull()) throw new Error("???????????? ???????????????????? ?? ???????????? ??????!");

		const items: CharacterOrWeapon[] = new Array(pulls);

		for (let i = 0; i < pulls; ++i) {
			items[i] = this.makeOneWish(eventItemIndex);
		}

		return items
	}

	private makeOneWish(eventItemIndex?: number): CharacterOrWeapon {
		this.randomNumber = Math.random() * 100;
		this.addPity()

		if (this.userFiveStarPity >= this.softPity) this.chanceFiveStarIncrease += this.softPityIncreaseBy
		if (this.isFiveStar()) return this.getFiveStar(eventItemIndex)

		if (this.isFourStar()) return this.getFourStar();

		return this.getThreeStar();
	}

	private addPity(): void {
		this.userFiveStarPity++;
		this.userFourStarPity++
	}

	private isFiveStar(): boolean {
		return this.userFiveStarPity >= this.pityFiveStar || this.randomNumber <= this.chanceToWinFiveStar + this.chanceFiveStarIncrease
	}

	private getFiveStar = (eventItemIndex?: number): CharacterOrWeapon => {
		this.chanceFiveStarIncrease = 0;
		this.userFiveStarPity = 0;

		if (this.bannerType === BannerTypes.STANDARD) {
			return this.getRandomItem(this.wishItems.value.standardFiveStars)
		}

		if (!this.wishItems.value.eventFiveStars) throw new Error("?????? ?????????????????? ???????????????????? ?? ?????????????????? ????????????!!")

		if (this.bannerType === BannerTypes.EVENT && eventItemIndex === undefined) throw new Error("???? ???? ?????????????? ???????????? ???????????????????? ??????????????????!")

		eventItemIndex = eventItemIndex ?? this.getRoundedRandomNumber(this.wishItems.value.eventFiveStars.length - 1)

		if (!this.wishItems.value.eventFiveStars[eventItemIndex]) throw new Error("?????????????????? ???????????? ???????????????????? ?????????????????? ???????????????? ???? ????????????!")

		if (this.isFiveStarGuaruntee) {
			this.isFiveStarGuaruntee = false;
			return this.wishItems.value.eventFiveStars[eventItemIndex]
		}

		const character = this.getRandomItem(this.wishItems.value.standardFiveStars, this.wishItems.value.eventFiveStars, eventItemIndex)

		if (character.name !== this.wishItems.value.eventFiveStars[eventItemIndex].name) {
			this.isFiveStarGuaruntee = true;
		}

		return character
	}

	private isFourStar = (): boolean => {
		return this.userFourStarPity >= this.pityFourStar || this.randomNumber <= this.chanceToWinStandartFourStar
	}

	private getFourStar = (): CharacterOrWeapon => {
		this.userFourStarPity = 0;
		if (this.bannerType === BannerTypes.STANDARD) {
			return this.getRandomItem(this.wishItems.value.standardFourStars)
		}

		if (!this.wishItems.value.eventFourStars) throw new Error("?????? ?????????????????? ???????????????????? ?????? ???????????? ?? ?????????????????? ????????????!!")

		if (this.isFourStarGuaruntee) {
			this.isFourStarGuaruntee = false;
			const random = this.getRoundedRandomNumber(this.wishItems.value.eventFourStars.length - 1)
			return this.wishItems.value.eventFourStars[random]
		}

		const item = this.getRandomItem(this.wishItems.value.standardFourStars, this.wishItems.value.eventFourStars)

		if (!this.wishItems.value.eventFourStars.find((i) => item.name_key === i.name_key)) {
			this.isFourStarGuaruntee = true;
		}

		return item
	}

	private getThreeStar = (): CharacterOrWeapon => {
		const randomThreeStar = this.getRoundedRandomNumber(this.wishItems.value.standardThreeStars.length - 1)
		return this.wishItems.value.standardThreeStars[randomThreeStar]
	}

	private getRandomItem = (standardItems: CharacterOrWeapon[], eventItems?: CharacterOrWeapon[], indexedEventItem?: number): CharacterOrWeapon => {

		if ((this.bannerType === BannerTypes.EVENT || this.bannerType === BannerTypes.EVENT_WEAPON) && eventItems) {
			const randomNum = Math.random() * this.chanceToWinStandartFourStar
			const randomEventItem = indexedEventItem ?? this.getRoundedRandomNumber(eventItems.length - 1)
			if (randomNum < this.chanceToWinEventFourStar) return eventItems[randomEventItem]
		}

		const randomItem = this.getRoundedRandomNumber(standardItems.length - 1)
		return standardItems[randomItem]
	}

	private isWishItemsNull() {
		return this.wishItems.value === null
	}

	private getRoundedRandomNumber(size: number): number {
		return Math.round(Math.random() * size)
	}
}