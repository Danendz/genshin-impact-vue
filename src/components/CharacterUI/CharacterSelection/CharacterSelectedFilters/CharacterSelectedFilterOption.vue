<template>
	<div class="selected-option">
		<span>{{renames[props.option] || props.option}}</span>
	</div>
</template>

<script setup lang="ts">

interface Props {
	option: string;
}

const renames: Record<string, string> = {
	'5': "5 Star",
	'4': "4 Star"
}

const props = defineProps<Props>()

</script>

<style lang="scss">
.selected-option {
	padding: 0px 5px;
	background-color: rgba(255, 255, 255, 0.966);
	border-radius: 12px;
	user-select: none;
	transition: .2s;

	span {
		white-space: nowrap;
		font-weight: bold;
		font-size: 20px;
	}

}

@media only screen and (max-width: 915px) {
	.selected-option {
		span {
			font-size: 13px;
		}
	}

}
</style>