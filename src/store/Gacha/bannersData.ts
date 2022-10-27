import { useGetCurrentBanner, useGetStandardBanner } from "@/Composables/getBannersData";
import { ErrorMessages } from "@/Enums/ErrorMessages";
import { CurrentBanner } from "@/Interfaces/CurrentBanner";
import { StandardBanner } from "@/Interfaces/StandardBanner";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useBannersData = defineStore('banners data', () => {
	const standard_banner = ref<StandardBanner | null>(null)
	const current_banner = ref<CurrentBanner | null>(null)
	const err = ref<ErrorMessages.NOT_FOUND | null>(null)

	const fetchBannersData = async () => {
		if ((Array.isArray(standard_banner.value) && Array.isArray(current_banner.value)) || err.value !== null) return;

		const data_standard_banner = await useGetStandardBanner();
		const data_current_banner = await useGetCurrentBanner()

		if (data_standard_banner === ErrorMessages.NOT_FOUND || data_current_banner === ErrorMessages.NOT_FOUND) {
			err.value = ErrorMessages.NOT_FOUND
			throw new Error('not found banners')
		} else {
			standard_banner.value = data_standard_banner;
			current_banner.value = data_current_banner
		}
	}

	const getStandardBanner = computed(() => {
		return standard_banner
	})

	const getCurrentBanner = computed(() => {
		return current_banner
	})

	return { getStandardBanner, getCurrentBanner, fetchBannersData }
})