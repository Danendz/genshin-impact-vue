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

		this.chanceFiveStarIncrease = userFiveStarPity > 70 ? 0.1 * (userFiveStarPity - 70) : 0

		if (customFiveStarPity) this.pityFiveStar = customFiveStarPity
	}

	public makeWishes(pulls: number): CharacterOrWeapon[] {
		if (this.isWishItemsNull()) return [];
		const items: CharacterOrWeapon[] = new Array(pulls);
		for (let i = 0; i < pulls; ++i) {
			items[i] = this.makeOneWish();
		}

		return items
	}

	private makeOneWish(): CharacterOrWeapon {
		this.randomNumber = Math.random() * 100;
		this.addPity()

		if (this.userFiveStarPity >= this.softPity) this.chanceFiveStarIncrease += 0.1

		if (this.isFiveStar()) return this.getFiveStar()

		if (this.isFourStar()) return this.getFourStar();

		return this.getThreeStar();
	}

	private addPity(): void {
		this.userFiveStarPity++;
		this.userFourStarPity++
	}

	private isFiveStar(): boolean {
		return this.userFiveStarPity === this.pityFiveStar || this.randomNumber <= this.chanceToWinFiveStar + this.chanceFiveStarIncrease
	}

	private getFiveStar = (): CharacterOrWeapon => {
		this.chanceFiveStarIncrease = 0;
		this.userFiveStarPity = 0;

		if (this.bannerType === BannerTypes.STANDARD) {
			return this.getRandomItem(this.wishItems.value.standardFiveStars)
		}

		if (!this.wishItems.value.eventFiveStars) throw new Error("Нет ивентовых персонажей в ивентовом банере!!")

		if (this.isFiveStarGuaruntee) {
			this.isFiveStarGuaruntee = false;
			return this.wishItems.value.eventFiveStars[0]
		}

		const character = this.getRandomItem(this.wishItems.value.standardFiveStars, this.wishItems.value.eventFiveStars, 0)

		if (character.name !== this.wishItems.value.eventFiveStars[0].name) {
			this.isFiveStarGuaruntee = true;
		}

		return character
	}

	private isFourStar = (): boolean => {
		return this.userFourStarPity === this.pityFourStar || this.randomNumber <= this.chanceToWinStandartFourStar
	}

	private getFourStar = (): CharacterOrWeapon => {
		this.userFourStarPity = 0;
		if (this.bannerType === BannerTypes.STANDARD) {
			return this.getRandomItem(this.wishItems.value.standardFourStars)
		}

		if (this.isFourStarGuaruntee && this.wishItems.value.eventFourStars) {
			this.isFourStarGuaruntee = false;
			const random = this.getFlooredRandomNumber(this.wishItems.value.eventFourStars.length - 1)
			return this.wishItems.value.eventFourStars[random]
		}

		this.isFourStarGuaruntee = true;
		return this.getRandomItem(this.wishItems.value.standardFourStars, this.wishItems.value.eventFourStars)
	}

	private getThreeStar = (): CharacterOrWeapon => {
		const randomThreeStar = this.getFlooredRandomNumber(this.wishItems.value.standardThreeStars.length - 1)
		return this.wishItems.value.standardThreeStars[randomThreeStar]
	}

	private getRandomItem = (standardItems: CharacterOrWeapon[], eventItems?: CharacterOrWeapon[], indexedEventItem?: number): CharacterOrWeapon => {

		if ((this.bannerType === BannerTypes.EVENT || this.bannerType === BannerTypes.EVENT_WEAPON) && eventItems) {
			const randomNum = Math.random() * 10
			const randomEventItem = indexedEventItem ?? this.getFlooredRandomNumber(eventItems.length - 1)
			if (randomNum < 5) return eventItems[randomEventItem]
		}

		const randomStandardFiveStar = this.getFlooredRandomNumber(standardItems.length - 1)
		return standardItems[randomStandardFiveStar]
	}

	private isWishItemsNull() {
		return this.wishItems.value === null
	}

	private getFlooredRandomNumber(size: number): number {
		return Math.floor(Math.random() * size)
	}
}