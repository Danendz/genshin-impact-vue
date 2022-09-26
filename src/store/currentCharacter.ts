import { Character } from "@/Interfaces/CharacterInterface";
import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCurrentCharacter = defineStore('currentCharacter', () => {
    const currentCharacter = ref<Character>()
    const currentCharacterIndex = ref<number>(0)
    const setCurrentCharacter = (character: Character, index: number) => {
        currentCharacter.value = character
        currentCharacterIndex.value = index
    }

    return {currentCharacter, currentCharacterIndex, setCurrentCharacter}
})