<template>
    <PageTransition>
        <ErrorPage v-if="characters === ErrorMessages.NOT_FOUND || characters?.length === 0"
            :error-message="ErrorMessages.NOT_FOUND" />

        <CharacterLayout v-else-if="characters" :characters="characters" />

        <LoaderPage v-else title="персонажей" />

    </PageTransition>
</template>

<script setup lang="ts">
//components
import CharacterLayout from '@/components/CharacterUI/CharacterLayout.vue';
import PageTransition from '@/components/UI/PageTransition.vue'
import LoaderPage from '@/components/UI/LoaderPage.vue'
import ErrorPage from '@/components/UI/ErrorPage.vue'

//composables
import { useGetCharacterByName, useGetCharacters } from '@/Composables/useGetCharacters';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//types 
import { CharacterType } from '@/Types/CharacterType'

//enums 
import { ErrorMessages } from '@/Enums/ErrorMessages';

//vue
import { computed, Ref } from 'vue';
import { useRoute } from 'vue-router';

const name: string | string[] = useRoute().params.name;

//if name exists - fetch only one character
//else fetch all characters
const fetchCharacters: Ref<CharacterType> = name ? useGetCharacterByName(name.toString()) : useGetCharacters()

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
    if (isCharacter(fetchCharacters.value)) {
        return [fetchCharacters.value]
    } else {
        return fetchCharacters.value
    }
})

</script>

<style lang="scss">
@import '@/assets/Styles/animations';

* {
    scrollbar-width: thin;
    scrollbar-color: #7a7a7a #ffffff;
}

*::-webkit-scrollbar {
    width: 5px;
    height: 8px;
}

*::-webkit-scrollbar-track {
    background: transparent;
}

*::-webkit-scrollbar-thumb {
    background-color: #e4dfc9;
    border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
}
</style>