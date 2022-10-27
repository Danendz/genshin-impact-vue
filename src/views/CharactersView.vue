<template>
    <PageTransition :error="charactersStore.error" :condition-item="charactersStore.getCharacters.value"
        :loader-title="'персонажей'">
        <CharacterLayout />
    </PageTransition>
</template>

<script setup lang="ts">
//composables
import useSetDefaultLayout from '@/Composables/useSetDefaultLayout'

//components
import CharacterLayout from '@/components/CharacterUI/CharacterLayout.vue';
import PageTransition from '@/components/UI/PageTransition.vue'

//stores
import { useCharacters } from '@/store/Characters/Characters';

//vue
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const name = useRoute().params.name
const charactersStore = useCharacters()
const { setLayout } = useSetDefaultLayout()
//fetch character
onMounted(() => {
    setLayout()
    if (name) {
        charactersStore.fetchCharacters(name.toString())
    } else {
        charactersStore.fetchCharacters()
    }
})


</script>