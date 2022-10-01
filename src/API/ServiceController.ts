import { ErrorMessages } from "@/Enums/ErrorMessages";
import { Character } from "@/Interfaces/CharacterInterface";
import { Weapon } from "@/Interfaces/WeaponInterface";
import { useActiveCategory } from '@/store/ActiveCategory'
import FetchCharactersCategory from '@/assets/Data/Fetch_Characters_Category.json'
type fetchingItemsType = Character | Weapon

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
    public async get<T extends fetchingItemsType>(): Promise<T[] | ErrorMessages.NOT_FOUND> {
        const ActiveCategory = useActiveCategory()
        const data: T[] | ErrorMessages.NOT_FOUND =
            await fetch(`${this.fetchUrl}all?fields=${FetchCharactersCategory[ActiveCategory.active_category]}`)
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