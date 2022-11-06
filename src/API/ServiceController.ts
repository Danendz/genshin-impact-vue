
import { useFetch } from "@/Composables/useFetch";
import { ErrorMessages } from "@/Enums/ErrorMessages";
import { Character } from "@/Interfaces/CharacterInterface";
import { CurrentEventBanner, CurrentEventWeaponBanner } from "@/Interfaces/CurrentBanners";
import { EventBanners } from "@/Interfaces/EventBanners";
import { EventWeaponBanners } from "@/Interfaces/EventWeaponsBanners";
import { StandardBanner } from "@/Interfaces/StandardBanner";
import { Weapon } from "@/Interfaces/WeaponInterface";
type currentBannersInfo = CurrentEventBanner | CurrentEventWeaponBanner
type currentBannersData = EventBanners | EventWeaponBanners

type fetchingItemsType = Character | Weapon | StandardBanner | currentBannersInfo | currentBannersData
export default abstract class ServiceController {

    //url for fetching
    abstract fetchUrl: string;

    private getFetchError(): string {
        return ErrorMessages.CANT_FETCH_DATA.replace('{url}', this.fetchUrl)
    }

    //get only names
    public async getNames(): Promise<string[] | string> {
        const data: Response | string = await useFetch(this.fetchUrl, this.getFetchError())
        if (typeof data === 'string') return data;
        return await data.json()
    }

    //get item by name
    public async getByName<T extends fetchingItemsType>(name: string): Promise<T | string> {
        const data: Response | string = await useFetch(`${this.fetchUrl}${name}`, this.getFetchError() + name)
        if (typeof data === 'string') return data;
        return await data.json();
    }

    //get all items with full information
    public async get<T extends fetchingItemsType>(fields?: string[]): Promise<T[] | string> {
        const paramsFields = fields ? `?fields=${fields}` : ''

        const data: Response | string = await useFetch(`${this.fetchUrl}all${paramsFields}`, `${this.getFetchError()}all${paramsFields}`)

        if (typeof data === 'string') return data;

        return await data.json()
    }

    //get all items with full information
    public async getWithAdditionalUrl<T extends fetchingItemsType>(url?: string): Promise<T | string> {

        const data: Response | string = await useFetch(`${this.fetchUrl}${url ?? ''}`, `${this.getFetchError()}${url ?? ''}`)

        if (typeof data === 'string') return data;

        return await data.json()
    }
}