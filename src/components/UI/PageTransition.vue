<template>
    <Suspense v-if="!conditionItem.includes(null)">
        <template #default>
            <slot />
        </template>
        <template #fallback>
            <LoaderPage :title="loaderTitle" />
        </template>
    </Suspense>
    <ErrorPage v-else-if="!props.error.includes(null)" :error-message="ErrorMessages.NOT_FOUND" />
</template>

<script setup lang="ts">
//components
import LoaderPage from './LoaderPage.vue';

//interfaces
import { ErrorMessages } from '@/Enums/ErrorMessages';

import { defineAsyncComponent, ref, watch, toRefs, onUnmounted } from 'vue';

const ErrorPage = defineAsyncComponent(() => import('@/components/UI/ErrorPage.vue'))

interface Props {
    conditionItem: (unknown | null)[],
    error: (ErrorMessages | null)[],
    loaderTitle: string
}
const props = defineProps<Props>()
const { conditionItem } = toRefs(props)
const progressMultiplier = 100 / conditionItem.value.length
const progress = ref(progressMultiplier)

const progressCounter = watch(conditionItem, () => {
    progress.value += progressMultiplier
})

onUnmounted(() => {
    progress.value = 0;
    progressCounter()
})

</script>