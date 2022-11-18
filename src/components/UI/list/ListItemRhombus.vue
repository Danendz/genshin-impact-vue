<template>
	<li :class="['list-item-rhombus', { 'list-item-rhombus_active': isActive }]">
		<p>{{ props.text }}</p>
	</li>
</template>


<script setup lang="ts">

interface Props {
	text: string,
	isActive: boolean
}

const props = defineProps<Props>()

</script>


<style lang="scss">
.list-item-rhombus {
	display: flex;
	align-items: center;
	user-select: none;
	cursor: pointer;
	padding-bottom: 16px;
	color: rgb(212, 212, 212);
	transition: .3s;
	position: relative;

	&::before {
		content: '';
		margin-right: 10px;
		z-index: -1;
		transition: .5s;
		box-sizing: border-box;
		display: block;
		transform: rotate(45deg) scale(var(--ggs, 0.6));
		width: 15px;
		height: 15px;
		border-radius: 2px;
		background-color: rgb(163, 163, 163);
		border: 1px solid rgb(163, 163, 163);
	}

	&::after {
		content: '';
		position: absolute;
		left: 0;
		width: 10px;
		height: 10px;
		box-sizing: border-box;
		display: block;
		width: 15px;
		height: 15px;
		transform: rotate(45deg) scale(var(--ggs, 0.45));
		background: linear-gradient(45deg, transparent 50%, white 50%);
		border-radius: 2px;
		opacity: 0;
	}

	&:hover {
		color: white;
	}

	&_active {
		color: white;

		&::before {
			background-color: transparent;
			transform: rotate(45deg) scale(var(--ggs, 0.9));
		}

		&::after {
			opacity: 1;
			animation: ActiveOption 1s infinite linear;
		}
	}
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
	.list-item-rhombus {
		padding-bottom: 0px;
	}
}

@keyframes ActiveOption {
	0% {
		translate: 0;
	}

	50% {
		translate: 4px;
	}

	100% {
		translate: 0;
	}
}
</style>