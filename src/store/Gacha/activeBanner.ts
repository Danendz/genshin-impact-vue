import { BannerTypes } from "@/Enums/WishEnums"
import { defineStore } from "pinia"
import { ref, computed } from "vue"

type activeBannerType = [BannerTypes, number?]



export const useActiveBanner = defineStore('active banner', () => {

	const activeBannerWish = ref<activeBannerType | null>(null)
	const totalBannerWishes = ref<activeBannerType[] | null>(null);
	const activeBannerImage = ref(0)

	const getActiveBannerWish = computed(() => {
		return activeBannerWish
	})

	const getActiveBannerImage = computed(() => {
		return activeBannerImage
	})

	const getTotalBannerWishes = computed(() => {
		return totalBannerWishes
	})

	const setActiveBannerImage = (value: number) => {
		if (!totalBannerWishes.value) return;
		activeBannerImage.value = value;
		setActiveBannerWish(totalBannerWishes.value[activeBannerImage.value])
	}

	const setActiveBannerWish = (value: activeBannerType) => {
		activeBannerWish.value = value;
	}

	const setTotalBannerWishes = (value: activeBannerType[]) => {
		totalBannerWishes.value = value;
	}

	return { getActiveBannerWish, getTotalBannerWishes, getActiveBannerImage, setTotalBannerWishes, setActiveBannerImage }
})