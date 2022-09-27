//composables
import { useGetCharacterByName, useGetCharacters } from "@/Composables/useGetCharacters";

//enums
import { ErrorMessages } from "@/Enums/ErrorMessages";

//interfaces
import { Character } from "@/Interfaces/CharacterInterface";
import { filter } from "@/Interfaces/FilterCharacter";

//pinia / vue
import { defineStore } from "pinia";
import { computed, ref } from 'vue'

interface ISortAndFilter {
    sort: '' | 'nation' | 'vision' | 'weapon' | 'name',
    filter: typeof filter
}

export const useCharacters = defineStore('characters', () => {
    const characters = ref<Character[] | null>(null)
    const error = ref<ErrorMessages | null>(null)
    const sortAndFilter = ref<ISortAndFilter>({
        sort: '',
        filter: filter,
    })

    const fetchCharacters = async (name?: string) => {
        let data;
        if (name) {
            data = await useGetCharacterByName(name.toLowerCase())
        } else {
            data = await useGetCharacters()
        }
        setData(data)
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
                characters.value = [data]
            }
            else {
                characters.value = data
            }
        }
    }

    const filterCharacters = computed(() => {
        if (characters.value) {
            return Object.keys(sortAndFilter.value.filter).reduce((result, key) => {
                result = result.filter((character: Character) => {
                    const keyFilter = key as keyof typeof sortAndFilter.value.filter
                    if (key === keyFilter) {
                        return sortAndFilter.value.filter[key][character[key]] ? true : false
                    }
                })
                return result
            }, characters.value)
        }
        return characters.value
    })

    const getCharacters = computed(() => {
        return filterCharacters.value
    })

    return { getCharacters, error, sortAndFilter, fetchCharacters }
})

