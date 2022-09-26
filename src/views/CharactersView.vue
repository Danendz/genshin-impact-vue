<template>
    <PageTransition :condition-item="characters" :loader-title="'персонажей'">
        <CharacterLayout :characters="(characters as Character[])" />
    </PageTransition>
</template>

<script setup lang="ts">
//components
import CharacterLayout from '@/components/CharacterUI/CharacterLayout.vue';
import PageTransition from '@/components/UI/PageTransition.vue'

//composables
import { useGetCharacterByName, useGetCharacters } from '@/Composables/useGetCharacters';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//types 
import { CharacterType } from '@/Types/CharacterType'

//vue
import { computed, Ref } from 'vue';
import { useRoute } from 'vue-router';

const name = useRoute().params.name

//if name exists - fetch only one character
//else fetch all characters
const fetchedCharacters: Ref<CharacterType> = name ? useGetCharacterByName(name.toString()) : useGetCharacters();

//type guard for character
const isCharacter = (character: CharacterType): character is Character => {
    if (!character) {
        return false
    }
    return (character as Character).name !== undefined
}

//this computed property checks if the character isn't array
//then returns the character as array
//else just returns the array or other stuff from CharacterType
const characters = computed(() => {
    if (isCharacter(fetchedCharacters.value)) {
        return [fetchedCharacters.value]
    } else {
        return fetchedCharacters.value
    }
})

</script>