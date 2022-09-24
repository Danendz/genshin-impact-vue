import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowAllCharacters = defineStore('showAllCharacters', () => {
    const showAllCharacters = ref<boolean>(false)

    const setShowAllCharacters = ():void => {
    
        showAllCharacters.value = !showAllCharacters.value
    }

    return {showAllCharacters, setShowAllCharacters}
})