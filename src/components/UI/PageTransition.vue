<template>
    <AsyncComponent v-bind="properties" v-if="loaded" @vnode-mounted="isMounted = true" />
    <ErrorPage v-else-if="errorTitle" :error-message="errorTitle" />
    <Transition name="loader" appear>
        <LoaderPage :style="{ pointerEvents: isMounted ? 'none' : 'all' }" v-if="(!loaded || !isMounted) && !errorTitle"
            :progress="progress" />
    </Transition>
</template>

<script setup lang="ts">
//components
import LoaderPage from './LoaderPage.vue';

import { defineAsyncComponent, ref, watch, toRefs, onUnmounted, onMounted } from 'vue';

interface Props {
    conditionItem: (unknown | null)[],
    error: (string | null)[],
    component: Promise<ReturnType<typeof defineAsyncComponent>>,
    properties?: Record<string, unknown>
}

const props = defineProps<Props>()
const { conditionItem, error } = toRefs(props)

const ErrorPage = defineAsyncComponent(() => import('@/components/UI/ErrorPage.vue'))
const AsyncComponent = defineAsyncComponent(() => props.component)

const progressMultiplier = 100 / conditionItem.value.length
const progress = ref(progressMultiplier)
const errorTitle = ref<string | null>(null)

const loaded = ref(false)
const isMounted = ref(false)

const progressCounter = watch(conditionItem, () => {
    progress.value += progressMultiplier;
    if (!conditionItem.value.includes(null)) {
        loaded.value = true;
    }
})

const errorWatcher = watch(error, () => {
    for (const errs of error.value) {
        if (typeof errs === 'string') {
            errorTitle.value = errs;
            break;
        }
    }
})

onMounted(() => {
    if (!conditionItem.value.includes(null)) {
        loaded.value = true;
    }
})


onUnmounted(() => {
    progress.value = 0;
    progressCounter()
    errorWatcher()
})

</script>


<style lang="scss">
@import '@/assets/Styles/animations';

.loader-enter-active,
.loader-leave-active {
    transition: opacity 0.45s ease;
}

.loader-enter-from,
.loader-leave-to {
    opacity: 0;
}
</style>