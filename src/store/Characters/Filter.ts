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

	//setting sort and filter to default state
	const setDefaultFilter = () => {
		sort.value.sort = '';
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

	//sorting characters
	const sortCharacters: ComputedRef<Character[] | null> = computed(() => {
		if (characters.value) {
			if (forFilterCharacters.value) {
				return forFilterCharacters.value.sort((charA, charB) => {
					if (sort.value.reverse) {
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


	//filter function that filter only if one or more filter parameters are selected
	const filterCharacters: ComputedRef<Character[] | null> = computed(() => {
		if (sortCharacters.value && selectedFilterOptions.value.length) {
			const start = performance.now()
			let res: Character[] = sortCharacters.value
			for (const key in filters.value) {

				const keyFilter = key as keyof FilterType

				if (filters.value[keyFilter].length) {

					res = res.filter((character: Character) => {
						return selectedFilterOptions.value.includes(character[keyFilter].toString())
					})

				}
			}
			const end = performance.now()
			console.log(`filter ${end - start}ms`)
			return res
		}
		return sortCharacters.value
	})

	const addOrRemoveFilterOption = (option: string, optionKey: keyof FilterType) => {
		const start = performance.now()
		if (!filters.value[optionKey]) filters.value[optionKey] = []

		if (filters.value[optionKey].includes(option)) {
			selectedFilterOptions.value = selectedFilterOptions.value.filter((selectedOption) => selectedOption !== option)
			filters.value[optionKey] = filters.value[optionKey].filter((opt) => opt !== option)

		} else {
			filters.value[optionKey].push(option)
			selectedFilterOptions.value.push(option)
		}
		const end = performance.now()

		console.log(`add-remove ${end - start}ms`)
	}

	//getting sorted and filtered array of characters
	const getFilteredCharacter: ComputedRef<ComputedRef<Character[] | null>> = computed(() => {
		return filterCharacters
	})

	const getSelectedFilterOptions: ComputedRef<Ref<string[]>> = computed(() => {
		return selectedFilterOptions
	})


	return { getFilteredCharacter, getSelectedFilterOptions, sort, addOrRemoveFilterOption, setDefaultFilter, defaultFilter }
}