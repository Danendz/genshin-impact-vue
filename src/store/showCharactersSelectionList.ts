import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowCharactersSelectionList = defineStore('showCharactersSelectionList', () => {
    const show = ref<boolean>(false)

    const setShow = ():void => {
        show.value = !show.value
    }

    return {show, setShow}
})