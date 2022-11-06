<template>
    <Suspense v-if="!conditionItem.includes(null)">
        <template #default>
            <slot />
        </template>
    </Suspense>
    <ErrorPage v-else-if="errorTitle" :error-message="errorTitle" />
    <LoaderPage v-else :title="loaderTitle" :progress="progress" />

</template>

<script setup lang="ts">
//components
import LoaderPage from './LoaderPage.vue';

import { defineAsyncComponent, ref, watch, toRefs, onUnmounted } from 'vue';

const ErrorPage = defineAsyncComponent(() => import('@/components/UI/ErrorPage.vue'))

interface Props {
    conditionItem: (unknown | null)[],
    error: (string | null)[],
    loaderTitle: string
}
const props = defineProps<Props>()
const { conditionItem, error } = toRefs(props)

const progressMultiplier = 100 / conditionItem.value.length
const progress = ref(progressMultiplier)
const errorTitle = ref<string | null>(null)

const progressCounter = watch(conditionItem, () => {
    progress.value += progressMultiplier;
})

const errorWatcher = watch(error, () => {
    for (const errs of error.value) {
        if (typeof errs === 'string') {
            errorTitle.value = errs;
            break;
        }
    }
})

onUnmounted(() => {
    progress.value = 0;
    progressCounter()
    errorWatcher()
})

</script>