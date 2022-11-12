<template>
	<button class="rounded-button-with-circle">
		<i class="gi-circle-o" />
		<p>{{ props.title }}</p>
	</button>
</template>


<script setup lang="ts">

const props = defineProps<{
	title: string
}>()

</script>


<style lang="scss">
.rounded-button-with-circle {
	display: flex;
	align-items: center;
	border-radius: 50px;
	opacity: 0.5;
	width: 80%;
	height: 45px;
	background-color: transparent;
	padding: 0 15px;
	transition: all .3s;
	border: 1px solid rgb(177, 177, 177) !important;

	p {
		color: white;
		margin-right: auto;
		font-size: 20px;
		transition: all .3s;

	}

	.gi-circle-o {
		line-height: 0;
		color: #f0c879;
		font-size: 20px;
		margin-right: auto;
		position: relative;
		z-index: 0;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			transform: scale(1.7);
			border-radius: 50%;
			background-color: rgb(0, 0, 0);
			transition: all .3s;
			opacity: 0.5;
		}
	}

	&:hover {
		opacity: 1;
		background-color: #ede5da;
	}

	&:hover p {
		color: #3f4557;
	}

	&:hover .gi-circle-o::after {
		opacity: 0.7;
	}
}

@media only screen and (max-width: 915px) {
	.rounded-button-with-circle {
		height: 35px;

		.gi-circle-o {
			font-size: 16px;
		}

		p {
			font-size: 17px;
		}
	}
}
</style>