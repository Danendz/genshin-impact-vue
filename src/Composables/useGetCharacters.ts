//api
import CharacterService from '@/API/CharacterService'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//interface
import { Character } from '@/Interfaces/CharacterInterface'

//types
import { DataResponseType } from '@/Types/DataResponseType'

//vue
import { ref } from 'vue'

const characterService = new CharacterService()

const useGetCharacters = () => {
    const characters = ref<DataResponseType<Character[], ErrorMessages.NOT_FOUND> | null>(null)

    const getCharacters = async (): Promise<void> => {
        const data: DataResponseType<Character[], ErrorMessages.NOT_FOUND>
            = await characterService.get<Character>();
        characters.value = data
    }
    getCharacters();

    return { characters }
}

const useGetCharacterByName = (name: string) => {
    const character = ref<DataResponseType<Character, ErrorMessages.NOT_FOUND> | null>(null)
    const getCharacter = async () => {
        const data: DataResponseType<Character, ErrorMessages.NOT_FOUND>
            = await characterService.getByName(name)
        character.value = data
    }
    getCharacter();
    return { character }
}

export { useGetCharacters, useGetCharacterByName }