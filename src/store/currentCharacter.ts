import { Character } from "@/Interfaces/CharacterInterface";
import { defineStore } from "pinia";
import { computed, ref, watch } from 'vue'
import { useCharacters } from "./Characters/Characters";

export const useCurrentCharacter = defineStore('currentCharacter', () => {
    const currentCharacter = ref<Character>()
    const currentCharacterIndex = ref<number>(0)
    const prevCurrentCharacterIndex = ref<number>(0)

    //setting current character by character and character index in characters array
    const setCurrentCharacter = (character: Character) => {
        if (characters.value) {
            prevCurrentCharacterIndex.value = currentCharacterIndex.value
            currentCharacter.value = character
            currentCharacterIndex.value = characters.value.map(character => character.name_key).indexOf(currentCharacter.value.name_key)
        }
    }

    const charactersStore = useCharacters()
    const characters = charactersStore.getCharacters

    const getCurrentCharacterIndex = computed(() => {
        return currentCharacterIndex
    })

    watch(characters, () => {
        if (characters.value) {
            setCurrentCharacter(characters.value[currentCharacterIndex.value])
        }
    })

    return { currentCharacter, currentCharacterIndex, getCurrentCharacterIndex, prevCurrentCharacterIndex, setCurrentCharacter }
})