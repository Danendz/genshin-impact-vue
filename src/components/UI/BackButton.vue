<template>
	<button :style="customStyles" class="close-button">
		<i :style="{ fontSize: props.fontSize }" v-if="buttonType === 'back'" class="gi-reply" />
		<i :style="{ fontSize: props.fontSize }" v-else class="gi-close" />
	</button>
</template>


<script setup lang="ts">

interface Props {
	buttonType: 'close' | 'back',
	fontSize?: string,
	isWithBackground: boolean,
	width?: string,
	height?: string,
	color?: string
}

const props = defineProps<Props>()

const customStyles = {
	color: props.color,
	width: props.width,
	height: props.height,
	border: props.isWithBackground ? '3.5px solid #abbcc6' : 0,
	backgroundColor: props.isWithBackground ? '#e0ddd4' : 'transparent'
}

</script>

<style lang="scss">
.close-button {
	display: flex;
	-moz-box-pack: center;
	-webkit-box-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #e0ddd4;
	color: #3b3e4a;
	overflow: hidden;
	cursor: pointer;
	transition: all .3s;

	&:hover {
		border-color: #fff !important;
		color: #3b3e4a !important;
		background-color: #e0ddd4 !important;
		box-shadow: #a0afbe99 0 0 7px 2px;
	}

	&:active {
		transform: scale(.9);
		background-color: #e0ddd4 !important;
		color: #fff !important;
		border-color: #a9a9a9 !important;
	}

	.gi-close,
	.gi-reply {
		line-height: 0;
	}
}
</style>