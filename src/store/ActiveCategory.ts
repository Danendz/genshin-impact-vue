import { OptionsKeys } from "@/Enums/OptionsKeys";
import { defineStore } from "pinia";
import { computed, ref, watch } from 'vue'
import { useCharacters } from "./Characters/Characters";

type allowedCharacterCategories = OptionsKeys

export const useActiveCategory = defineStore('ActiveCategory', () => {
    const active_category = ref<allowedCharacterCategories>(OptionsKeys.ATTRIBUTES)

    const setActiveCategory = (category: allowedCharacterCategories): void => {
        active_category.value = category
    }

    const getActiveCategory = computed(() => {
        return active_category
    })

    watch(active_category, async () => {
        await useCharacters().fetchCharacters()
    })
    return { active_category, setActiveCategory, getActiveCategory }
})