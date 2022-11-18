<template>
	<div class="selected-option">
		<span>{{ t(`characters.filter-options.${props.option.toLowerCase()}`) }}</span>
	</div>
</template>

<script setup lang="ts">
import { useGetTranslator } from '@/Composables/useGetTranslator';


interface Props {
	option: string;
}

const props = defineProps<Props>()
const { t } = useGetTranslator()
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
		font-size: 17px;
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