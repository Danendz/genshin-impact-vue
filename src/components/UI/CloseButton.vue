<template>
	<ButtonWithIcon button-class="page-close-button" :accessible-name="'go back'" @click="router.push({ name: 'home' })"
		icon="mdi:close" icon-class="characters-panel__close-icon" />
</template>


<script setup lang="ts">

import ButtonWithIcon from '@/components/UI/ButtonWithIcon.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

</script>


<style lang="scss">
.page-close-button {

	cursor: pointer;
	transition: .2s;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	border: 5px solid #b3b3b35d;
	background-color: #e0dada;
	margin-right: 5px;

	&:hover {
		transform: scale(1.1)
	}

	.characters-panel__close-icon {
		width: 30px;
		height: 30px;
	}

}

@media only screen and (max-width: 915px) {
	.page-close-button {
		width: 30px;
		height: 30px;
	}
}
</style>