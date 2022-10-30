
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const usePrimogems = defineStore('primogems', () => {
	const localStorageData = localStorage.getItem('primogems')

	const primogems = ref<number>(localStorageData ? parseInt(localStorageData) : 1600);

	const getPrimogems = computed(() => {
		return primogems
	})

	const setPrimogems = (value: number) => {
		localStorage.setItem('primogems', value.toString())
		primogems.value = value
	}

	return {
		getPrimogems, setPrimogems
	}
})