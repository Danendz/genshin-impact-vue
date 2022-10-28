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
import { defineAsyncComponent } from 'vue';
import LoaderPage from './LoaderPage.vue';

//interfaces
import { ErrorMessages } from '@/Enums/ErrorMessages';

const ErrorPage = defineAsyncComponent(() => import('@/components/UI/ErrorPage.vue'))

interface Props {
    conditionItem: (unknown | null)[],
    error: (ErrorMessages | null)[],
    loaderTitle: string
}
const props = defineProps<Props>()

</script>