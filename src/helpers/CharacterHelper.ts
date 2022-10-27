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

            const typeExceptions = [CharacterImage.ICON_BIG, CharacterImage.ICON_SIDE, CharacterImage.ICON_SIDE_LQ]

            if (name.includes('traveler')) {
                if (typeExceptions.includes(type)) {
                    iconSideArgs = '-lumine'
                }
                switch (type) {
                    case CharacterImage.ICON_SIDE_LQ:
                        type = CharacterImage.ICON_SIDE
                        break;
                    case CharacterImage.GACHA_SPLASH_LQ:
                        type = CharacterImage.GACHA_SPLASH
                        break;
                }
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

    public static getPlaceholderIcon(iconType: CharacterImage): string {
        return this.genshinSiteUrl + 'placeholder-icons/' + iconType + '-placeholder'
    }
}