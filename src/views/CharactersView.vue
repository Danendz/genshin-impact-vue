<template>
    <PageTransition :error="charactersStore.error" :condition-item="charactersStore.getCharacters" :loader-title="'персонажей'">
        <CharacterLayout />
    </PageTransition>
</template>

<script setup lang="ts">
//components
import CharacterLayout from '@/components/CharacterUI/CharacterLayout.vue';
import PageTransition from '@/components/UI/PageTransition.vue'

//interfaces
import { useCharacters } from '@/store/Characters';

//vue
import {onMounted } from 'vue';
import { useRoute } from 'vue-router';

const name = useRoute().params.name

const charactersStore = useCharacters()
//fetch character
onMounted(() => {
    if (name) {
        charactersStore.fetchCharacters(name.toString())
    }
    charactersStore.fetchCharacters()
})


</script>