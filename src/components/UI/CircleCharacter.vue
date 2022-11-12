<template>
	<section class="circle-character">
		<LazyImg :options="{
			src: CharacterHelper.getCharacterImage(props.name_key, CharacterImage.ICON_BIG_LQ),
			loading: CharacterHelper.getPlaceholderIcon(CharacterImage.ICON_BIG),
			alt: 'character',
			delay: delay ?? 200,
		
		}" />
	</section>
</template>


<script setup lang="ts">
import LazyImg from './Lazy-Img.vue';
import CharacterHelper from '@/helpers/CharacterHelper';
import { CharacterImage } from '@/Enums/CharacterEnums';

const props = defineProps<{
	name_key: string,
	delay?: number
}>()

</script>


<style lang="scss">
@import '@/assets/Styles/placeholder_animation';

.circle-character {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 2px solid white;
	overflow: hidden;
	user-select: none;
	background-color: #c19172;

	img {
		width: auto;
		height: 100%;
	}
}
</style>