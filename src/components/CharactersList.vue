<template>
    <p v-for="character in characters" :key="character.name">
        {{character.name}}
    </p>
</template>

<script setup lang="ts">
import { CharactersStore } from '@/Enums/StoreEnums';
import { Character } from '@/Interfaces/CharacterInterface';
import { useStore } from 'vuex';

const store = useStore()
const characters: Character[] = store
    .state[CharactersStore.MODULE_NAME][CharactersStore.STATE_CHARACTERS]
    
</script>