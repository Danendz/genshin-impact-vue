<template>
    <PageTransition :error="[getError]" :condition-item="[getCharacters]" :loader-title="'персонажей'">
        <CharacterLayout />
    </PageTransition>

</template>

<script setup lang="ts">
//composables
import useSetDefaultLayout from '@/Composables/useSetDefaultLayout'

//components
import PageTransition from '@/components/UI/PageTransition.vue'

//stores
import { useCharacters } from '@/store/Characters/Characters';

//vue
import { onMounted, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const CharacterLayout = defineAsyncComponent(() => import('@/components/CharacterUI/CharacterLayout.vue'))

const name = useRoute().params.name
const { fetchCharacters, getCharacters, getError } = useCharacters()
const { setLayout } = useSetDefaultLayout()
//fetch character
onMounted(() => {
    setLayout()
    if (name) {
        fetchCharacters(name.toString())
    } else {
        fetchCharacters()
    }
})


</script>