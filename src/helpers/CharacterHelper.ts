import { APIEntries } from "@/Enums/APIEntries";
import { CharacterImage } from '@/Enums/CharacterEnums'
export default class CharacterHelper {
    static characterUrl: string = APIEntries.BASE_URL + APIEntries.CHARACTERS
    static elementsUrl: string = APIEntries.BASE_URL + APIEntries.ELEMENTS
    static genshinSiteUrl: string = APIEntries.BASE_URL + APIEntries.GENSHIN_SITE

    public static getCharacterImage(name: string | undefined, type: CharacterImage): string {
        if (name) {
            const completeUrl = this.characterUrl + name.toLowerCase() + '/'
            let iconSideArgs = ''

            const typeExceptions = [CharacterImage.ICON_BIG, CharacterImage.ICON_SIDE]

            if (name.includes('traveler') && typeExceptions.includes(type)) {
                iconSideArgs = '-lumine'
            }
            return completeUrl + type + iconSideArgs;
        }
        return ''
    }
    public static getElementImage(element: string): string {
        return this.elementsUrl + element + '/icon'
    }

    public static getGenshinSiteIcons(iconUrl: string): string {
        return this.genshinSiteUrl + iconUrl
    }
}