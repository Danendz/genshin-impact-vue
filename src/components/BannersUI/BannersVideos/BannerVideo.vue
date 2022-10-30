<template>
	<section v-if="getCurrentVideo" class="banners-layout__bg-video-container">
		<transition name="fade" mode="in-out">
			<video ref="wishVideo" :key="getCurrentVideo" class="banners-layout__bg-video" :muted="isMuted"
				@ended="setCurrentWishVideo(3, 1, true)" autoplay>
				<source :src="getCurrentVideo">
			</video>
		</transition>
	</section>
</template>


<script setup lang="ts">
import { useWish } from '@/store/Gacha/Wish';
import { useWishVideos } from '@/store/Gacha/wishVideos';
import { ref, watch } from 'vue'

const { setCurrentWishVideo, getCurrentVideo } = useWishVideos()
const { getIsWishing } = useWish()

const wishVideo = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)

watch(getIsWishing, () => {
	if (isMuted.value) {
		isMuted.value = false
	}
})

watch(wishVideo, () => {
	if (wishVideo.value) {

		wishVideo.value.volume = 0.5
	}
})
</script>