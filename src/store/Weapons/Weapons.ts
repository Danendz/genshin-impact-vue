import { defineStore } from "pinia";
import { Weapon } from '@/Interfaces/WeaponInterface'
import { useGetWeapons } from "@/Composables/useGetWeapons";
import { computed, ref } from 'vue'

export const useWeapons = defineStore('weapons', () => {
	const weapons = ref<Weapon[] | null>(null)
	const err = ref<string | null>(null)

	const fetchWeapons = async (fields?: string[]) => {
		if (!Array.isArray(weapons) || err.value) {
			const data = await useGetWeapons(fields)
			setData(data)
		}
	}

	const setData = (data: Weapon[] | string) => {
		if (typeof data === 'string') {
			err.value = data
		} else {
			weapons.value = data
			for (let i = 0; i < weapons.value.length; i++) {
				weapons.value[i].name_key = weapons.value[i].name.toLowerCase().replaceAll(' ', '-').replaceAll('\'', '')
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