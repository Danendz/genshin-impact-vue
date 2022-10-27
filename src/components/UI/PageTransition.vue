<template>
    <Suspense v-if="conditionItem">
        <template #default>
            <slot />
        </template>
        <template #fallback>
            <LoaderPage :title="'персонажей'" />
        </template>
    </Suspense>
    <ErrorPage v-else-if="props.error" :error-message="props.error" />
</template>

<script setup lang="ts">
//components
import { defineAsyncComponent } from 'vue';
import LoaderPage from './LoaderPage.vue';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';
import { ErrorMessages } from '@/Enums/ErrorMessages';

const ErrorPage = defineAsyncComponent(() => import('@/components/UI/ErrorPage.vue'))

interface Props {
    conditionItem: Character[] | null,
    error: ErrorMessages | null,
    loaderTitle: string
}
const props = defineProps<Props>()

</script>