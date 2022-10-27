//api
import CharacterService from '@/API/CharacterService'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//interface
import { Character } from '@/Interfaces/CharacterInterface'
import { useActiveCategory } from '@/store/ActiveCategory'

//types
import { DataResponseType } from '@/Types/DataResponseType'

//json
import FetchCharactersCategory from '@/assets/Data/Fetch_Characters_Category.json'

const characterService = new CharacterService()

const useGetCharactersNames = async () => {
    const data: string[] = await characterService.getNames()
    return data
}

const useGetCharacters = async () => {
    const { active_category } = useActiveCategory()

    const data: DataResponseType<Character[], ErrorMessages.NOT_FOUND> = await characterService.get<Character>(FetchCharactersCategory[active_category]);
    return data
}

const useGetCharacterByName = async (name: string) => {
    const data: DataResponseType<Character, ErrorMessages.NOT_FOUND> = await characterService.getByName(name)
    return data
}

export { useGetCharacters, useGetCharacterByName, useGetCharactersNames }