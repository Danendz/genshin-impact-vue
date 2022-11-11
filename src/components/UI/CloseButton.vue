<template>
	<BackButton :button-type="'close'" :is-with-background="true" @click="goBack" />
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import BackButton from './BackButton.vue';

const router = useRouter()

const routesToBack = ['/wish']

const goBack = () => {
	if (routesToBack.includes(window.history.state.back)) {
		router.go(-1)
	} else {
		router.push({ name: 'home' })
	}
}
</script>


<style lang="scss">

</style>