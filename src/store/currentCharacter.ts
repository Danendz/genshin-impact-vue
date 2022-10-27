import { Character } from "@/Interfaces/CharacterInterface";
import { defineStore } from "pinia";
import { ref } from 'vue'
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

    return { currentCharacter, currentCharacterIndex, prevCurrentCharacterIndex, setCurrentCharacter }
})