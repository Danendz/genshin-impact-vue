<template>
    <transition name="fade" appear mode="out-in">
        <ErrorPage v-if="typeof conditionItem === 'string' || conditionItem?.length === 0"
            :error-message="(conditionItem as string)" />
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

interface Props {
    conditionItem: Character[] | string | null,
    loaderTitle: string
}
const props = defineProps<Props>()

</script>