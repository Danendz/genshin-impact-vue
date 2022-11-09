<template>
	<section v-if="getCurrentVideo" class="banners-video-container">
		<transition name="fade">
			<button v-show="!skipHided" @click="skipWish" class="banners-video-container__skip">
				Skip
			</button>
		</transition>
		<transition name="fade" mode="in-out">
			<video @click="toggleSkip" ref="wishVideo" :key="getCurrentVideo" class="banners-video-container__bg-video"
				:muted="isMuted" @ended="onEnded" autoplay :loop="!getIsWishing">
				<source :src="getCurrentVideo">
			</video>
		</transition>
	</section>
</template>


<script setup lang="ts">
//stores
import { useWish } from '@/store/Gacha/Wish';
import { useWishVideos } from '@/store/Gacha/wishVideos';
import { useObtainedItems } from '@/store/Gacha/obtainedItems'

//vue
import { ref, watch } from 'vue'

const { setCurrentWishVideo, getCurrentVideo } = useWishVideos()
const { getIsWishing } = useWish()
const { getShowObtainedItems, getObtainedItems, setShowObtainedItems, setActiveWish } = useObtainedItems()

const wishVideo = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)
const skipHided = ref(true)

const toggleSkip = () => {

	if (getIsWishing.value && !getShowObtainedItems.value) {
		skipHided.value = !skipHided.value
	}

}

const skipWish = () => {
	setActiveWish(getObtainedItems.value.length)
	onEnded();
}

const onEnded = () => {
	if (getIsWishing.value && wishVideo.value) {
		skipHided.value = true
		setShowObtainedItems(true)
		wishVideo.value.pause()
		setTimeout(() => {
			setCurrentWishVideo(3, 1, true)
		}, 400);
	}
}

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

<style lang="scss">
.banners-video-container {

	&__bg-video {
		height: 100%;
		width: 177.77777778vh;
		min-width: 100%;
		min-height: 56.25vw;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		position: absolute;

	}

	&__skip {
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 3;
		background-color: transparent;
		color: rgb(241, 241, 241);
		border: 0;
		cursor: pointer;
		font-size: 18px;
		user-select: none;
	}
}
</style>