import { OptionsKeys } from "@/Enums/OptionsKeys";
import { defineStore } from "pinia";
import { ref } from 'vue'

type allowedCharacterCategories = OptionsKeys

export const useActiveCategory = defineStore('ActiveCategory', () => {
    const active_category = ref<allowedCharacterCategories>(OptionsKeys.ATTRIBUTES)

    const setActiveCategory = (category: allowedCharacterCategories): void => {
        active_category.value = category
    }
    return {active_category, setActiveCategory}
})