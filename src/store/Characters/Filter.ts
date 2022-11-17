//interfaces
import { FilterType, SortType } from "@/Interfaces/FilterCharacter"
import { Character } from "@/Interfaces/CharacterInterface"

//vue
import { ref, computed, ComputedRef, Ref } from "vue"

interface ISortAndFilter {
	sort: SortType,
	reverse: boolean
}

export const useCharactersFilter = (characters: Ref<Character[] | null>) => {
	const sort = ref<ISortAndFilter>({
		sort: '',
		reverse: false
	})

	const selectedFilterOptions = ref<string[]>([]);
	const filters = ref<Record<string, string[]>>({})
	const confirm = ref<boolean>(false)

	//setting sort and filter to default state
	const setDefaultFilter = () => {
		sort.value.sort = '';
		sort.value.reverse = false;
		defaultFilter();
	}

	const defaultFilter = () => {
		filters.value = {}
		selectedFilterOptions.value = []

	}

	//unlinking original array with characters
	const forFilterCharacters: ComputedRef<Character[]> = computed(() => {
		if (characters.value) return characters.value.map((el) => el)
		return []
	})


	//filter function that filter only if one or more filter parameters are selected
	const filterCharacters: ComputedRef<Character[] | null> = computed(() => {
		if (forFilterCharacters.value && selectedFilterOptions.value.length) {
			if (confirm.value) {

				let res: Character[] = forFilterCharacters.value
				for (const key in filters.value) {
					const keyFilter = key as keyof FilterType
					if (filters.value[keyFilter].length) {
						res = res.filter((character: Character) => {
							return selectedFilterOptions.value.includes(character[keyFilter].toString())
						})
					}
				}
				confirm.value = false
				return res

			}
		}
		return forFilterCharacters.value
	})

	//sorting characters
	const sortCharacters: ComputedRef<Character[] | null> = computed(() => {
		if (filterCharacters.value) {
			return filterCharacters.value.sort((charA, charB) => {
				if (sort.value.reverse) return sortFunction(charB, charA)
				return sortFunction(charA, charB)
			})
		}
		return filterCharacters.value
	})

	//sort function that can reverse sort results
	const sortFunction = (charA: Character, charB: Character) => {

		if (sort.value.sort !== '') {
			const key = sort.value.sort
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



	const addOrRemoveFilterOption = (option: string, optionKey: keyof FilterType) => {
		if (!filters.value[optionKey]) filters.value[optionKey] = []

		if (filters.value[optionKey].includes(option)) {
			selectedFilterOptions.value = selectedFilterOptions.value.filter((selectedOption) => selectedOption !== option)
			filters.value[optionKey] = filters.value[optionKey].filter((opt) => opt !== option)

		} else {
			filters.value[optionKey].push(option)
			selectedFilterOptions.value.push(option)
		}
	}

	//getting sorted and filtered array of characters
	const getFilteredCharacter: ComputedRef<ComputedRef<Character[] | null>> = computed(() => {
		return sortCharacters
	})

	const getSelectedFilterOptions: ComputedRef<Ref<string[]>> = computed(() => {
		return selectedFilterOptions
	})


	return { getFilteredCharacter, getSelectedFilterOptions, confirm, sort, addOrRemoveFilterOption, setDefaultFilter, defaultFilter }
}