import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNotEnoughFunds = defineStore('not enough funds', () => {

	const isNotEnough = ref(false)

	const getIsNotEnough = computed(() => {
		return isNotEnough
	})

	const setIsNotEnough = (value: boolean) => {
		isNotEnough.value = value
	}

	return { getIsNotEnough, setIsNotEnough }
})