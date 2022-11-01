<template>
	<img draggable="false" class="total-item__item-bg"
		:src="CharacterHelper.getBannersImages('/wish/background.svg')" />
</template>


<script setup lang="ts">
import CharacterHelper from '@/helpers/CharacterHelper';

</script>


<style lang="scss">
.total-item {
	&__item-bg {
		width: 100%;
		height: 100%;
		max-height: 80vh;
		z-index: 5;
	}
}
</style>