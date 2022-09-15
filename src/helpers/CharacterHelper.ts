import { APIEntries } from "@/Enums/APIEnries";

export default class CharacterHelper  {
    static url: string = APIEntries.BASE_URL + APIEntries.CHARACTERS

    public static getCharacterSideImage(name: string): string {
        return this.url + name.toLowerCase() + '/icon-side'
    } 
}