//composables
import { useGetCharacterByName, useGetCharacters } from "@/Composables/useGetCharacters";

//enums
import { ErrorMessages } from "@/Enums/ErrorMessages";

//interfaces
import { Character } from "@/Interfaces/CharacterInterface";
import { FilterType, SortType, vision, weapon, rarity, nation } from "@/Interfaces/FilterCharacter";

//stores
import { useActiveCategory } from '@/store/ActiveCategory'

//pinia / vue
import { defineStore } from "pinia";
import { computed, ref } from 'vue'

interface ISortAndFilter {
    sort: SortType,
    filter: FilterType,
    reverse: boolean
}


export const useCharacters = defineStore('characters', () => {
    const characters = ref<Character[] | null>(null)
    const error = ref<ErrorMessages | null>(null)
    const alreadyLoaded: string[] = ["Attributes"]
    const sortAndFilter = ref<ISortAndFilter>({
        sort: '',
        filter: { vision: { ...vision }, weapon: { ...weapon }, rarity: { ...rarity }, nation: { ...nation } },
        reverse: false
    })

    const selectedFilterOptions = ref<string[]>([]);

    const active_category = useActiveCategory()

    //fetching characters
    const fetchCharacters = async (name?: string) => {
        const isNotArray = !Array.isArray(getCharacters.value)
        const isArrayButLengthLessThanOrEqualToOne = Array.isArray(getCharacters.value) && getCharacters.value.length <= 1
        const hasError = error.value

        //fetching new data
        if (isNotArray || isArrayButLengthLessThanOrEqualToOne || hasError || name) {
            characters.value = null
            error.value = null
            let data;
            if (name) {
                data = await useGetCharacterByName(name.toLowerCase())
            } else {
                data = await useGetCharacters()
            }
            setData(data)
        } else {
            //if data already fetched so we can't fetch it again
            if (!alreadyLoaded.includes(active_category.active_category)) {
                const data = await useGetCharacters()
                addData(data)
                alreadyLoaded.push(active_category.active_category)
            }
        }
    }

    //setting sort and filter to default state
    const setDefaultFilter = () => {
        sortAndFilter.value.sort = '';
        defaultFilter();
    }

    const defaultFilter = () => {
        sortAndFilter.value.filter = { vision: { ...vision }, weapon: { ...weapon }, rarity: { ...rarity }, nation: { ...nation } }
        selectedFilterOptions.value = []
    }

    //type guard for character
    const isCharacter = (character: Character | Character[]): character is Character => {
        if (!character) {
            return false
        }
        return (character as Character).name !== undefined
    }

    //setting data conditionally
    const setData = (data: ErrorMessages.NOT_FOUND | null | Character | Character[]) => {
        if (data) {
            if (data === ErrorMessages.NOT_FOUND) {
                error.value = ErrorMessages.NOT_FOUND
            } else if (isCharacter(data)) {
                //if data is only one character
                //set characters as array with only one character
                characters.value = [data]
            }
            else {
                characters.value = data
            }
        }
    }

    //adding additional data to existing data
    const addData = (data: ErrorMessages.NOT_FOUND | Character[]) => {
        if (Array.isArray(data)) {
            data.forEach((values, id) => {
                Object.keys(values).forEach((key) => {
                    const charKey = key as keyof Character
                    if (characters.value) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        characters.value[id][charKey] = values[charKey]
                    }
                })
            })
        }
        else {
            error.value = data
        }
    }
    //unlinking original array with characters
    const forFilterCharacters = computed(() => {
        if (characters.value) return characters.value.map((el) => el)
        return []
    })

    //sorting characters
    const sortCharacters = computed(() => {
        if (characters.value) {
            if (forFilterCharacters.value) {
                return forFilterCharacters.value.sort((charA, charB) => {
                    if (sortAndFilter.value.reverse) {
                        return sortFunction(charB, charA)
                    }
                    return sortFunction(charA, charB)
                })
            }
        }

        return characters.value
    })

    //sort function that can reverse sort results
    const sortFunction = (charA: Character, charB: Character) => {
        if (sortAndFilter.value.sort !== '') {
            const key = sortAndFilter.value.sort
            if (key === 'rarity') {
                const charARarity = parseInt(charA[key])
                const charBRarity = parseInt(charB[key])
                return charBRarity - charARarity
            }
            return charA[key].localeCompare(charB[key])
        }
        else {
            return charA.name_key.localeCompare(charB.name_key)
        }
    }

    //filter function that filter only if one or more filter parameters are selected
    const filterCharacters = computed(() => {
        if (sortCharacters.value) {
            return Object.keys(sortAndFilter.value.filter).reduce((result, key) => {
                const keyFilter = key as keyof typeof sortAndFilter.value.filter

                let res: Character[] | null = null;
                if (selectedFilterOptions.value.length) {
                    res = result.filter((character: Character) => {
                        const characterValueByKey = character[keyFilter]
                        const filterValueByKey = sortAndFilter.value.filter[keyFilter]
                        return filterValueByKey[characterValueByKey]
                    })
                    return res.length === 0 ? result : result = res
                }
                return result
            }, sortCharacters.value)
        }
        return sortCharacters.value
    })

    const addOrRemoveFilterOption = (option: string) => {
        const optionInSelected = selectedFilterOptions.value.filter((selectedOption) => selectedOption === option)

        if (optionInSelected.length) {
            selectedFilterOptions.value = selectedFilterOptions.value.filter((selectedOption) => selectedOption !== option)
        } else {
            selectedFilterOptions.value.push(option)
        }
    }


    //getting original array of characters
    const getCharacters = computed(() => {
        return characters
    })

    //getting sorted and filtered array of characters
    const getFilteredCharacter = computed(() => {
        return filterCharacters
    })

    const getSelectedFilterOptions = computed(() => {
        return selectedFilterOptions
    })

    return {
        getCharacters,
        getFilteredCharacter,
        error,
        sortAndFilter,
        getSelectedFilterOptions,
        fetchCharacters,
        setDefaultFilter,
        addOrRemoveFilterOption,
        defaultFilter
    }
})

