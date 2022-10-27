import { OptionsKeys } from "@/Enums/OptionsKeys";
import { defineStore } from "pinia";
import { ref, watch } from 'vue'
import { useCharacters } from "./Characters/Characters";

type allowedCharacterCategories = OptionsKeys

export const useActiveCategory = defineStore('ActiveCategory', () => {
    const active_category = ref<allowedCharacterCategories>(OptionsKeys.ATTRIBUTES)

    const setActiveCategory = (category: allowedCharacterCategories): void => {
        active_category.value = category
    }

    watch(active_category, async () => {
        await useCharacters().fetchCharacters()
    })
    return { active_category, setActiveCategory }
})