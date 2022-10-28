//pinia / vue
import { defineStore } from "pinia";

//store composables
import { useFetchCharacters } from "./FetchCharacters";
import { useCharactersFilter } from "./Filter";


export const useCharacters = defineStore('characters', () => {
    const { getCharacters, getError, fetchCharacters } = useFetchCharacters()

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
        getError,
        sort,
        confirm,
        getSelectedFilterOptions,
        fetchCharacters,
        setDefaultFilter,
        addOrRemoveFilterOption,
        defaultFilter
    }
})

