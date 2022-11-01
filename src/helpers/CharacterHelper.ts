import { APIEntries } from "@/Enums/APIEntries";
import { CharacterImage } from '@/Enums/CharacterEnums'
export default class CharacterHelper {
    private static characterUrl: string = APIEntries.BASE_URL + APIEntries.CHARACTERS
    private static weaponsUrl: string = APIEntries.BASE_URL + APIEntries.WEAPONS
    private static elementsUrl: string = APIEntries.BASE_URL + APIEntries.ELEMENTS
    private static genshinSiteUrl: string = APIEntries.BASE_URL + APIEntries.GENSHIN_SITE
    private static bannersUrl: string = APIEntries.BASE_URL

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

    public static getWeaponsImage(name: string, type: CharacterImage): string {
        return this.weaponsUrl + name.toLowerCase() + '/' + type
    }

    public static getElementImage(element: string): string {
        return this.elementsUrl + element.toLowerCase() + '/icon'
    }

    public static getGenshinSiteIcons(iconUrl: string): string {
        return this.genshinSiteUrl + iconUrl
    }

    public static getPlaceholderIcon(iconType: CharacterImage): string {
        return this.genshinSiteUrl + 'placeholder-icons/' + iconType + '-placeholder'
    }

    public static getBannersImages(iconUrl: string): string {
        return this.bannersUrl + iconUrl
    }

    public static getBannerImageByName(banner: string, name: string): string {
        return `${this.bannersUrl}/${banner}${name}banner`
    }
}