import { defineStore } from "pinia";
import { ref } from "vue";

export const useHideMainCharactersLayout = defineStore('hideMainCharactersLayout', () => {
    const hide = ref<boolean>(false)

    const setHide = ():void => {
        hide.value = !hide.value
    }

    return {hide, setHide}
})