import { ErrorMessages } from "@/Enums/ErrorMessages";
import { Character } from "@/Interfaces/CharacterInterface";
import { CurrentBanner } from "@/Interfaces/CurrentBanner";
import { StandardBanner } from "@/Interfaces/StandardBanner";
import { Weapon } from "@/Interfaces/WeaponInterface";
type fetchingItemsType = Character | Weapon | StandardBanner | CurrentBanner

export default abstract class ServiceController {

    //url for fetching
    abstract fetchUrl: string;

    //get only names
    public async getNames(): Promise<string[]> {
        const data = await fetch(this.fetchUrl)
            .then((res) => res.json())
            .catch((e) => console.log(e))
        return data
    }

    //get item by name
    public async getByName<T extends fetchingItemsType>(name: string): Promise<T | ErrorMessages.NOT_FOUND> {
        const data: T | ErrorMessages.NOT_FOUND = await fetch(`${this.fetchUrl}${name}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return ErrorMessages.NOT_FOUND
            })
            .catch((e) => console.log(e))
        return data;
    }

    //get all items with full information
    public async get<T extends fetchingItemsType>(fields?: string[]): Promise<T[] | ErrorMessages.NOT_FOUND> {
        const paramsFields = fields ? `?fields=${fields}` : ''
        const data: T[] | ErrorMessages.NOT_FOUND =
            await fetch(`${this.fetchUrl}all${paramsFields}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return ErrorMessages.NOT_FOUND
                })
                .catch((e) => console.log(e))

        return data
    }

    //get all items with full information
    public async getWithAdditionalUrl<T extends fetchingItemsType>(url?: string): Promise<T | ErrorMessages.NOT_FOUND> {
        const data: T | ErrorMessages.NOT_FOUND =
            await fetch(`${this.fetchUrl}${url ?? ''}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return ErrorMessages.NOT_FOUND
                })
                .catch((e) => console.log(e))

        return data
    }
}