<template>
	<section class="home-modal">
		<header>
			<h2>{{ props.title }}</h2>
			<BackButton :button-type="'close'" :is-with-background="false" :font-size="'20px'" :color="'#D5BB94'" />
		</header>
		<div class="home-modal__line"></div>
		<section class="home-modal__inner-content">
			<slot />
		</section>
		<div v-if="secondLine" class="home-modal__line"></div>
	</section>
</template>



<script setup lang="ts">
import BackButton from './BackButton.vue';

interface Props {
	title: string,
	secondLine?: boolean
}

const props = defineProps<Props>()

</script>


<style lang="scss">
.home-modal {
	position: fixed;
	max-width: 800px;

	width: 70%;
	height: 50%;
	background-color: #3F4557;

	header {
		display: flex;
		align-items: center;
		padding: 10px;

		h2 {
			color: #D5BB94;
			font-family: Genshin, Arial, Helvetica, sans-serif;
			font-weight: 100;
			margin-left: auto;
			margin-right: auto;
		}


	}
}
</style>