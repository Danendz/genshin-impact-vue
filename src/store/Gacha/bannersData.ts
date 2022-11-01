import { useGetBanner, useGetStandardBanner } from "@/Composables/getBannersData";
import { ErrorMessages } from "@/Enums/ErrorMessages";
import { EventBanners } from "@/Interfaces/EventBanners";
import { EventWeaponBanners } from "@/Interfaces/EventWeaponsBanners";
import { StandardBanner } from "@/Interfaces/StandardBanner";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useBannersData = defineStore('banners data', () => {
	const standardBanner = ref<StandardBanner | null>(null)
	const eventBanner = ref<EventBanners | null>(null)
	const eventWeaponBanners = ref<EventWeaponBanners | null>(null)
	const err = ref<ErrorMessages.NOT_FOUND | null>(null)

	const fetchBannersData = async () => {
		if ((Array.isArray(standardBanner.value) && Array.isArray(eventBanner.value)) && Array.isArray(eventWeaponBanners.value) || err.value !== null) return;

		const data_standard_banner = await useGetStandardBanner();

		const eventBanners = await useGetBanner()

		if (data_standard_banner === ErrorMessages.NOT_FOUND || eventBanners.eventBanner === ErrorMessages.NOT_FOUND || eventBanners.eventWeaponBanner === ErrorMessages.NOT_FOUND) {
			err.value = ErrorMessages.NOT_FOUND
			throw new Error('not found banners')

		} else {
			standardBanner.value = data_standard_banner;
			eventBanner.value = eventBanners.eventBanner;
			eventWeaponBanners.value = eventBanners.eventWeaponBanner
		}
	}

	const getStandardBanner = computed(() => {
		return standardBanner
	})

	const getEventBanner = computed(() => {
		return eventBanner
	})

	const getEventWeaponBanner = computed(() => {
		return eventWeaponBanners
	})

	const getErroBanner = computed(() => {
		return err
	})

	return { getStandardBanner, getEventBanner, getEventWeaponBanner, getErroBanner, fetchBannersData }
})