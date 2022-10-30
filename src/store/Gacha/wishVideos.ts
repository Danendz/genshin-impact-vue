import { downloadMediaContent } from "@/Composables/useDownloadMediaContent";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const videos = [
	'https://dl.dropboxusercontent.com/s/ozjz2h0o2yk429t/background.mp4?dl=0',
	'https://dl.dropboxusercontent.com/s/s1i5rn1jjko73my/3star1comp.mp4?dl=0',
	'https://dl.dropboxusercontent.com/s/ezfuheknfwq894g/4star1comp.mp4?dl=0',
	'https://dl.dropboxusercontent.com/s/ry11jjm6noge7ci/4%20star%2C%2010%20pull.mp4?dl=0',
	'https://dl.dropboxusercontent.com/s/mocypjf1tnfyhm1/5star1comp.mp4?dl=0',
	'https://dl.dropboxusercontent.com/s/212ymaxejx2kft5/5star10comp.mp4?dl=0'
]

const names = [
	"background",
	"3star1pulls",
	"4star1pulls",
	"4star10pulls",
	"5star1pulls",
	"5star10pulls"
]

export const useWishVideos = defineStore('Wish Videos', () => {
	const wishVideos = ref<string[] | null>(null)
	const currentVideo = ref<string | null>(null)

	const fetchWishVideos = async () => {
		if (!wishVideos.value) {
			const { fetchedContent, fetchContent } = downloadMediaContent(videos)
			await fetchContent()
			if (fetchedContent.value === null) throw new Error('ошибка загрузки видео')
			wishVideos.value = fetchedContent.value
			currentVideo.value = fetchedContent.value[0]
		}
	}

	const getWishVideos = computed(() => {
		return wishVideos
	})

	const getCurrentVideo = computed(() => {
		return currentVideo
	})

	const blobedVideos = computed(() => {
		if (!wishVideos.value) return null
		const res: Record<string, string> = {}

		for (let i = 0; i < wishVideos.value.length; i++) {
			res[names[i]] = wishVideos.value[i]
		}

		return res
	})

	const setCurrentWishVideo = (rarity: number, pulls: number, defaultVideo?: boolean): void => {
		if (!blobedVideos.value) throw new Error('блобы видосов не загружены!');
		if (defaultVideo) {
			currentVideo.value = blobedVideos.value['background']
			return;
		}
		const videoName = `${rarity}star${pulls}pulls`
		currentVideo.value = blobedVideos.value[videoName]
	}
	return { fetchWishVideos, getWishVideos, getCurrentVideo, setCurrentWishVideo }
})