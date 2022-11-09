import HomeService from "@/API/HomeService";
import HomeHelper from "@/helpers/HomeHelper";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useHomeBackgroundImages = defineStore('home background images', () => {

	const images = ref<string[] | null>(null)
	const error = ref<string | null>(null)
	const homeService = new HomeService()

	const fetchBackgroundImages = async () => {
		const data = await homeService.getWithAdditionalUrl<string[]>('home-backgrounds/list')

		if (typeof data === 'string') {
			error.value = data
		} else {
			images.value = data.map((name) => HomeHelper.getHomeBackground(name));
		}
	}

	const getImages = computed(() => {
		return images
	})

	const getImagesError = computed(() => {
		return error
	})

	return { getImages, getImagesError, fetchBackgroundImages }
})