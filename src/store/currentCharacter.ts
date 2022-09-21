import { Character } from "@/Interfaces/CharacterInterface";
import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCurrentCharacter = defineStore('currentCharacter', () => {
    const currentCharacter = ref<Character>()

    const setCurrentCharacter = (character: Character) => {
        currentCharacter.value = character
    }

    return {currentCharacter, setCurrentCharacter}
})