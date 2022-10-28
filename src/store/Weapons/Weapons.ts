import { defineStore } from "pinia";
import { Weapon } from '@/Interfaces/WeaponInterface'
import { useGetWeapons } from "@/Composables/useGetWeapons";
import { computed, ref } from 'vue'
import { ErrorMessages } from "@/Enums/ErrorMessages";

export const useWeapons = defineStore('weapons', () => {
	const weapons = ref<Weapon[] | null>(null)
	const err = ref<ErrorMessages | null>(null)

	const fetchWeapons = async (fields?: string[]) => {
		if (!Array.isArray(weapons) || err.value) {
			const data = await useGetWeapons(fields)
			setData(data)
		}
	}

	const setData = (data: Weapon[] | ErrorMessages.NOT_FOUND) => {
		if (data === ErrorMessages.NOT_FOUND) {
			err.value = ErrorMessages.NOT_FOUND
		} else {
			weapons.value = data
			for (let i = 0; i < weapons.value.length; i++) {
				weapons.value[i].name_key = weapons.value[i].name.toLowerCase().replaceAll(' ', '-')
			}
		}
	}

	const getWeapons = computed(() => {
		return weapons
	})

	const getErrorWeapons = computed(() => {
		return err
	})

	return { getWeapons, getErrorWeapons, fetchWeapons }
})