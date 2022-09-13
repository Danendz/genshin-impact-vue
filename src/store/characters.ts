import { CharactersStore } from "@/Enums/StoreEnums";
import { Character } from "@/Interfaces/CharacterInterface";

export interface CharactersState {
    [CharactersStore.STATE_CHARACTERS]: Character[]
}

export default {
    state: (): CharactersState => ({
        [CharactersStore.STATE_CHARACTERS]: []
    }),
    getters: {

    },
    mutations: {
        setCharacters(state: CharactersState, value: Character[]) {
            state[CharactersStore.STATE_CHARACTERS] = value;
        }
    },
    actions: {
    }
}