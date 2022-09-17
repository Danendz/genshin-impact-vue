<template>
    <transition name="fade" appear mode="out-in">
        <div v-if="characterFiltered === ErrorMessages.NOT_FOUND || characterFiltered?.length === 0">
            <ErrorPage :error-message="ErrorMessages.NOT_FOUND" />
        </div>
        <div v-else-if="characterFiltered && currentCharacter" class="characters-container">
            <CharacterBG :character="currentCharacter" />
            <CharacterPanel :current-character="currentCharacter" :active-character="activeCharacter"
                :characters="characterFiltered" @set-active-character="setActiveCharacter" />
            <CharactersContent />
            <CharactersBottom />
        </div>
        <LoaderPage title="персонажей" v-else />
    </transition>
</template>

<script setup lang="ts">
//composables
import { useGetCharacters } from '@/Composables/useGetCharacters';

//components
import CharacterPanel from '@/components/CharacterUI/CharacterPanel.vue'
import ErrorPage from '@/components/UI/ErrorPage.vue';
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';
import LoaderPage from '@/components/UI/LoaderPage.vue';
import CharactersContent from '@/components/CharacterUI/CharactersContent.vue';
import CharactersBottom from '../../components/CharacterUI/CharactersBottom.vue';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages';

//vue
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const activeCharacter = ref<number>(0)

const name: string | string[] = useRoute().params.name;
const characters = useGetCharacters()

const characterFiltered = computed(() => {
    if (Array.isArray(characters.value) && name) {
        return characters.value.filter((char) => char.name.toLowerCase().replaceAll(' ', '').includes(name.toString().toLowerCase()))
    }
    return characters.value
})

const currentCharacter = ref<Character | null>(null)

watch([activeCharacter, characters], () => {
    if (Array.isArray(characterFiltered.value)) {
        currentCharacter.value = characterFiltered.value[activeCharacter.value]
    }
})

const setActiveCharacter = (id: number): void => {
    activeCharacter.value = id
}
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

.characters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}
</style>