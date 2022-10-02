import { defineStore } from "pinia";
import {ref} from 'vue'

export const useShowDemoBGVideo = defineStore('showDemoBGVideo', () => {
    const show = ref(false)

    const toggleShow = () => {
        show.value = !show.value
    }

    return {show, toggleShow}
})
