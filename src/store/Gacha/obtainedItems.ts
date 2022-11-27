import { defineStore } from "pinia";
import { CharacterOrWeapon } from '@/Composables/UseWishing'
import { computed, ref } from 'vue'
import { LocalStorageData } from "@/Enums/LocalStorageData";

export const useObtainedItems = defineStore('obtained items', () => {

	const data = localStorage.getItem(LocalStorageData.OBTAINED_ITEMS)
	const alreadyObtainedItems = ref<Record<string, number>>({});
	const showObtainedItems = ref(false)
	const activeWish = ref(0)

	if (data) {
		alreadyObtainedItems.value = JSON.parse(data)
	}

	const obtainedItems = ref<CharacterOrWeapon[]>([])

	const setObtainedItems = (value: CharacterOrWeapon[]) => {
		if (obtainedItems.value.length >= 1) obtainedItems.value = []
		obtainedItems.value = value;
		setAlreadyObtainedItems()
		updateLocalStorageItems()
	}

	const setAlreadyObtainedItems = () => {
		for (const item of obtainedItems.value) {
			const itemInAlreadyItems = alreadyObtainedItems.value[item.name_key]
			if (itemInAlreadyItems === undefined) {
				alreadyObtainedItems.value[item.name_key] = 0
				continue
			}
			if (itemInAlreadyItems < 6) alreadyObtainedItems.value[item.name_key]++
		}
	}

	const updateLocalStorageItems = () => {
		localStorage.setItem(LocalStorageData.OBTAINED_ITEMS, JSON.stringify(alreadyObtainedItems.value))
	}

	const clearObtainedItems = () => {
		obtainedItems.value = []
	}

	const setShowObtainedItems = (value: boolean) => {
		showObtainedItems.value = value
	}

	const setActiveWish = (value: number) => {
		activeWish.value = value
	}

	const getSortedObtainedItems = () => {
		return obtainedItems.value.sort((itemA, itemB) => parseInt(itemB.rarity.toString()) - parseInt(itemA.rarity.toString()))
	}

	const getObtainedItems = computed(() => {
		return obtainedItems
	})

	const getAlreadyObtainedItems = computed(() => {
		return alreadyObtainedItems
	})

	const getShowObtainedItems = computed(() => {
		return showObtainedItems
	})

	const getActiveWish = computed(() => {
		return activeWish
	})



	return {
		getObtainedItems,
		getAlreadyObtainedItems,
		getShowObtainedItems,
		getActiveWish,
		getSortedObtainedItems,
		setObtainedItems,
		clearObtainedItems,
		setShowObtainedItems,
		setActiveWish
	}
})