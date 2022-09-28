import { Character } from "@/Interfaces/CharacterInterface";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useCharacters } from "./Characters";

export const useCurrentCharacter = defineStore('currentCharacter', () => {
    const currentCharacter = ref<Character>()
    const currentCharacterIndex = ref<number>(0)

    //setting current character by character and index
    const setCurrentCharacter = (character: Character) => {
        if (characters.value) {
            currentCharacter.value = character
            currentCharacterIndex.value = characters.value.map(character => character.name_key).indexOf(currentCharacter.value.name_key)
        }
    }

    const charactersStore = useCharacters()
    const characters = computed(() => {
        return charactersStore.getCharacters
    })

    return { currentCharacter, currentCharacterIndex, setCurrentCharacter }
})