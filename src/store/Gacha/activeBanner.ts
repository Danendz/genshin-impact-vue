import { BannerTypes } from "@/Enums/WishEnums"
import { defineStore } from "pinia"
import { ref, computed } from "vue"

type activeBannerType = [BannerTypes, number?]
export const useActiveBanner = defineStore('active banner', () => {

	const activeBannerWish = ref<activeBannerType | null>(null)
	const activeBannerImage = ref(0)

	const getActiveBannerWish = computed(() => {
		return activeBannerWish
	})

	const getActiveBannerImage = computed(() => {
		return activeBannerImage
	})

	const setActiveBannerImage = (value: number) => {
		activeBannerImage.value = value;
	}

	const setActiveBannerWish = (value: activeBannerType) => {
		activeBannerWish.value = value;
	}

	return { getActiveBannerWish, getActiveBannerImage, setActiveBannerImage, setActiveBannerWish }
})