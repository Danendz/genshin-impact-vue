<template>
	<Transition :name="`home-options-${props.animationPostfix}`" appear>
		<section v-show="mounted" class="home-menu__options">
			<Icon icon="entypo:camera" />
			<Icon icon="mdi:bulletin-board" />
			<Icon icon="fluent:mail-20-filled" />
			<Icon icon="ic:sharp-access-time" />
			<Icon icon="ci:settings-filled" />
		</section>
	</Transition>
</template>


<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
	animationPostfix: string
}>()

const mounted = ref(false)
onMounted(() => {
	mounted.value = true
})


</script>


<style lang="scss">
.home-menu__options {
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 2;
	align-items: center;
	gap: 20px;
	min-width: 50px;
	color: #cfbc8f;
	background: linear-gradient(to bottom, #4b5269 0%, #4b526960 100%);
	padding: 0px 15px;
	font-size: 40px;
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.home-menu {
		&__options {
			gap: 10px;
			min-width: 20px;
			padding: 0px 5px;
			font-size: 20px;
		}
	}
}

@media only screen and (orientation: portrait) {
	.home-menu {
		&__options {
			flex-direction: row;
			background: unset;
			background-color: #4b52699f;
			padding: 5px 0px;
			gap: 13px;
			font-size: 30px;
		}
	}
}
</style>