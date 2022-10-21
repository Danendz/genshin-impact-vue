<template>
	<TransitionGroup :appear="isAppear" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave"
		v-if="props.isGroup" :mode="mode">
		<slot />
	</TransitionGroup>

	<Transition :appear="isAppear" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" v-else
		:mode="mode">
		<slot :data-index="customIndex" />
	</Transition>
</template>

<script setup lang="ts">
//composables
import { useGsapTransition } from '@/Composables/GsapTransition';

//interfaces
import { IOptions } from '@/Interfaces/GsapTransitionOptions'

interface Props {
	isGroup?: boolean,
	isAppear?: boolean,
	customIndex?: number,
	mode?: string,
	options: IOptions
}

const props = defineProps<Props>()

const { onBeforeEnter, onEnter, onLeave } = useGsapTransition(props.options, props.customIndex)

</script>