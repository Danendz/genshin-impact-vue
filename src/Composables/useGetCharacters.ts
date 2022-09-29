//api
import CharacterService from '@/API/CharacterService'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//interface
import { Character } from '@/Interfaces/CharacterInterface'

//types
import { DataResponseType } from '@/Types/DataResponseType'

const characterService = new CharacterService()

const useGetCharactersNames = async () => {
    const data: string[] = await characterService.getNames()
    return data
}

const useGetCharacters = async () => {
    const data: DataResponseType<Character[], ErrorMessages.NOT_FOUND> = await characterService.get<Character>();
    return data
}

const useGetCharacterByName = async (name: string) => {
    const data: DataResponseType<Character, ErrorMessages.NOT_FOUND> = await characterService.getByName(name)
    return data
}

export { useGetCharacters, useGetCharacterByName, useGetCharactersNames }