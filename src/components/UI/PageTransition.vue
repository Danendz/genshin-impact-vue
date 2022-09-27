<template>
    <transition name="fade" appear mode="out-in">
        <ErrorPage v-if="error" :error-message="error" />
        <slot v-else-if="conditionItem" />
        <LoaderPage v-else :title="props.loaderTitle" />
    </transition>
</template>

<script setup lang="ts">
//components
import LoaderPage from './LoaderPage.vue';
import ErrorPage from './ErrorPage.vue';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';
import { ErrorMessages } from '@/Enums/ErrorMessages';

interface Props {
    conditionItem: Character[] | null,
    error: ErrorMessages | null,
    loaderTitle: string
}
const props = defineProps<Props>()

</script>