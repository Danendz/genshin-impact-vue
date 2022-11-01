
import { LocalStorageData } from "@/Enums/LocalStorageData";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const usePrimogems = defineStore('primogems', () => {
	const localStorageData = localStorage.getItem(LocalStorageData.PRIMOGEMS)

	const primogems = ref<number>(localStorageData ? parseInt(localStorageData) : 1600);

	const getPrimogems = computed(() => {
		return primogems
	})

	const setPrimogems = (value: number) => {
		localStorage.setItem(LocalStorageData.PRIMOGEMS, value.toString())
		primogems.value = value
	}

	return {
		getPrimogems, setPrimogems
	}
})