<template>
	<Transition :name="`home-main-${props.animationPostfix}`" appear>
		<section :style="{ transitionDelay: '0.15s' }" v-show="mounted" class="home-menu__main">
			<HomeMainUserInfo />
			<HomeMainNavigationItems />
		</section>
	</Transition>
</template>

<script setup lang="ts">
//components
import HomeMainUserInfo from './HomeMainUserInfo/HomeMainUserInfo.vue';
import HomeMainNavigationItems from './HomeMainNavigationItems/HomeMainNavigationItems.vue'
import { ref, onMounted } from 'vue';

const props = defineProps<{
	animationPostfix: string
}>()

const mounted = ref(false)

onMounted(() => {
	mounted.value = true
})
</script>

<style lang="scss">
.home-menu {
	&__main {
		display: flex;
		z-index: 1;
		flex-direction: column;
		width: 100%;
		max-height: 100vh;
		max-width: 600px;
		background: linear-gradient(to bottom, #e6e5d6 0%, rgba(255, 255, 255, 0.116) 100%);
	}
}

@media only screen and (orientation: portrait) {
	.home-menu {
		&__main {
			max-width: 100%;
			height: 100%;
			background: unset;
			align-items: center;
		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.home-menu {
		&__main {
			max-width: 45%;
		}
	}
}

@media only screen and (max-width: 667px) and (orientation: landscape) {
	.home-menu {
		&__main {
			max-width: 50%;
		}
	}
}
</style>