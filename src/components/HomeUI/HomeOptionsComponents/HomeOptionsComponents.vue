<template>
	<Suspense v-if="props.optionsStates.settings">
		<template #default>
			<HomeSettings @set-option-state="setOptionState" :state="props.optionsStates.settings" />

		</template>
		<template #fallback>
			<LoaderSpinner />
		</template>
	</Suspense>
</template>


<script setup lang="ts">
//interfaces
import LoaderSpinner from '@/components/UI/LoaderSpinner.vue';
import { HomeOptionStates } from '@/Interfaces/HomeOptionsStates';

//vue
import { defineAsyncComponent } from 'vue';


const HomeSettings = defineAsyncComponent(() => import('./HomeSettings/HomeSettings.vue'))

const props = defineProps<{
	optionsStates: HomeOptionStates,
	setOptionState: (key: keyof HomeOptionStates, value: boolean) => void
}>()


</script>