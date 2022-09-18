import { APIEntries } from "@/Enums/APIEntries";
import { CharacterImage } from '@/Enums/CharacterEnums'
export default class CharacterHelper {
    static characterUrl: string = APIEntries.BASE_URL + APIEntries.CHARACTERS
    static elementsUrl: string = APIEntries.BASE_URL + APIEntries.ELEMENTS

    public static getCharacterImage(name: string | undefined, type: CharacterImage): string {
        if (name) {
            const completeUrl = this.characterUrl + name.toLowerCase() + '/'
            let iconSideArgs = ''
            if(name.includes('traveler') && type === CharacterImage.ICON_SIDE){
                iconSideArgs = '-lumine'
            }
            return completeUrl + type + iconSideArgs;
        }
        return ''
    }
    public static getElementImage(element: string): string {
        return this.elementsUrl + element + '/icon'
    }
}