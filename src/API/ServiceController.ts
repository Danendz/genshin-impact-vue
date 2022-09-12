import { ErrorMessages } from "@/Enums/ErrorMessages";
import { Character } from "@/Interfaces/CharacterInterface";
import { Weapon } from "@/Interfaces/WeaponInterface";

type fetchingItemsType = Character | Weapon
export default abstract class ServiceController {

    //url for fetching
    abstract fetchUrl: string;

    //get only names
    private async getNames(): Promise<string[]> {
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
                    return res.json()
                }
                return ErrorMessages.NOT_FOUND
            })
            .catch((e) => console.log(e))
        return data;
    }

    //get all items with full information
    public async get<T extends fetchingItemsType>(): Promise<T[] | ErrorMessages.NOT_FOUND> {
        const names: string[] = await this.getNames();

        const data: (ErrorMessages.NOT_FOUND | T)[] = await Promise.all(names.map(async (name) => {
            return await this.getByName(name)
        }));

        const errorFound = data.find((value) => value === ErrorMessages.NOT_FOUND)

        if (errorFound) {
            return ErrorMessages.NOT_FOUND
        }

        return data as T[]
    }
}