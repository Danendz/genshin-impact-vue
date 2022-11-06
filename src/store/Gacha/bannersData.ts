import { useGetBanner, useGetStandardBanner } from "@/Composables/getBannersData";
import { EventBanners } from "@/Interfaces/EventBanners";
import { EventWeaponBanners } from "@/Interfaces/EventWeaponsBanners";
import { StandardBanner } from "@/Interfaces/StandardBanner";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

type allBanners = StandardBanner | EventBanners | EventWeaponBanners

export const useBannersData = defineStore('banners data', () => {
	const standardBanner = ref<StandardBanner | null>(null)
	const eventBanner = ref<EventBanners | null>(null)
	const eventWeaponBanners = ref<EventWeaponBanners | null>(null)
	const err = ref<string | null>(null)

	const fetchBannersData = async () => {
		if ((Array.isArray(standardBanner.value) && Array.isArray(eventBanner.value)) && Array.isArray(eventWeaponBanners.value) || err.value !== null) return;

		const data_standard_banner = await useGetStandardBanner()
		const eventBannersContainer = await useGetBanner()

		if (isError(data_standard_banner) || typeof eventBannersContainer === 'string') {
			return err.value = `${data_standard_banner}${eventBannersContainer}`
		}

		const fetchedEventBanner = eventBannersContainer.eventBanner
		const fetchedEventWeaponBanner = eventBannersContainer.eventWeaponBanner

		const standardBannerError = isError(data_standard_banner)
		const eventBannerError = isError(fetchedEventBanner)
		const eventWeaponBannerError = isError(fetchedEventWeaponBanner)

		if (standardBannerError || eventBannerError || eventWeaponBannerError) {
			err.value = `Standard: ${data_standard_banner}\nEvent: ${eventBannersContainer.eventBanner}\nEvent Weapon: ${eventBannersContainer.eventWeaponBanner}`
		} else {
			standardBanner.value = data_standard_banner;
			eventBanner.value = fetchedEventBanner
			eventWeaponBanners.value = fetchedEventWeaponBanner
		}
	}

	const isError = (bannerData: allBanners | string): bannerData is string => {
		return typeof bannerData === 'string'
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

	const getErrorBanner = computed(() => {
		return err
	})

	return { getStandardBanner, getEventBanner, getEventWeaponBanner, getErrorBanner, fetchBannersData }
})