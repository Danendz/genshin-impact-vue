import { useSetLocalStorageData } from "@/Composables/localStorageHelper";
import { LocalStorageData } from "@/Enums/LocalStorageData";
import { Character } from "@/Interfaces/CharacterInterface";
import { defineStore } from "pinia";
import { computed, ref } from 'vue'

interface IUserBirthday {
	month: number,
	day: number
}

export interface IUser {
	userAvatar: Character['name_key'],
	userCard: Character['name_key']
	UID: number,
	username: string,
	description: string,
	adventureRank: number,
	adventureExp: number,
	birthday: IUserBirthday
}

type UserStringValues = keyof Pick<IUser, 'userAvatar' | 'username' | 'description' | 'userCard'>;
type UserNumericValues = keyof Pick<IUser, 'UID' | 'adventureExp' | 'adventureRank'>;

const rankExpTable = [
	0, 375, 500, 625, 725, 850, 950, 1075, 1200, 1300, 1425, 1525, 1650, 1775, 1875, 2000, 2375, 2500, 2625, 2775,
	2825, 3425, 3725, 4000, 4300, 4575, 4875, 5150, 5450, 5725, 6025, 6300, 6600, 6900, 7175, 7475, 7750, 8050, 8325, 8625,
	10550, 11525, 12475, 13450, 14400, 15350, 16325, 17275, 18250, 19200, 26400, 28800, 31200, 33600, 36000, 232350, 258950,
	285750, 312825, 340125
];

const MAX_RANK = 60


export const useUserData = defineStore('user data', () => {
	const userDataLocalStorage = localStorage.getItem(LocalStorageData.USER)
	const templateUser: IUser = {
		userAvatar: 'raiden',
		userCard: 'diona',
		UID: 0,
		username: 'Introduce yourself to us!',
		description: 'Say something to the world!',
		adventureRank: 57,
		adventureExp: 0,
		birthday: {
			month: 0,
			day: 0
		}
	}

	const user = ref<IUser>(
		userDataLocalStorage ? JSON.parse(userDataLocalStorage) : templateUser
	)

	const getUser = computed(() => {
		return user
	})

	const isUserString = (key: keyof IUser): key is UserStringValues => {
		return typeof user.value[key] === 'string'
	}

	const isUserBirthday = (value: string | number | IUserBirthday): value is IUserBirthday => {
		return (value as IUserBirthday).day !== undefined
	}

	const isUserNumeric = (key: keyof IUser): key is UserNumericValues => {
		return typeof user.value[key] === 'number'
	}

	const setUser = (key: keyof IUser, value: string | number | IUserBirthday) => {
		if (typeof value === 'string' && isUserString(key)) {
			user.value[key] = value
		}
		if (isUserBirthday(value) && key === 'birthday') {
			user.value[key] = value
		}
		if (isUserNumeric(key) && typeof value === 'number') {
			user.value[key] = value
		}

		setLocalStorage(value, key)
	}

	const setAvatar = (name_key: string) => {
		user.value.userAvatar = name_key;
		setLocalStorage(name_key, 'userAvatar')
	}

	const setLocalStorage = (value: string | number | IUserBirthday, key: keyof IUser) => {
		if (!userDataLocalStorage) useSetLocalStorageData<IUser>(LocalStorageData.USER, user.value)
		else useSetLocalStorageData(LocalStorageData.USER, value, key)
	}

	const getNextRankExp = computed(() => {
		if (user.value.adventureRank >= MAX_RANK) return rankExpTable[60]
		return rankExpTable[user.value.adventureRank]
	})

	const getUserWorldLvl = computed(() => {
		if (user.value.adventureRank <= 19) return 0;
		return Math.floor((user.value.adventureRank - 20) / 5 + 1)
	})

	return { getUser, getNextRankExp, getUserWorldLvl, setUser, setAvatar }
})