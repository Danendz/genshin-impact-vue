//pinia / vue
import { defineStore } from "pinia";

//store composables
import { useFetchCharacters } from "./Characters/FetchCharacters";
import { useCharactersFilter } from "./Characters/Filter";


export const useCharacters = defineStore('characters', () => {
    const { getCharacters, error, fetchCharacters } = useFetchCharacters()

    const { getFilteredCharacter,
        getSelectedFilterOptions,
        sort,
        confirm,
        addOrRemoveFilterOption,
        setDefaultFilter,
        defaultFilter
    } = useCharactersFilter(getCharacters.value)

    return {
        getCharacters,
        getFilteredCharacter,
        error,
        sort,
        confirm,
        getSelectedFilterOptions,
        fetchCharacters,
        setDefaultFilter,
        addOrRemoveFilterOption,
        defaultFilter
    }
})

