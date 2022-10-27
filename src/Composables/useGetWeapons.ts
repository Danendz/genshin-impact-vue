//api
import WeaponService from '@/API/WeaponService'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//interface
import { Weapon } from '@/Interfaces/WeaponInterface'

//types
import { DataResponseType } from '@/Types/DataResponseType'

const weaponService = new WeaponService()

const useGetWeaponsNames = async () => {
    const data: string[] = await weaponService.getNames()
    return data
}

const useGetWeapons = async (fields?: string[]) => {
    const data: DataResponseType<Weapon[], ErrorMessages.NOT_FOUND> = await weaponService.get<Weapon>(fields);
    return data
}

const useGetWeaponByName = async (name: string) => {
    const data: DataResponseType<Weapon, ErrorMessages.NOT_FOUND> = await weaponService.getByName(name)
    return data
}

export { useGetWeapons, useGetWeaponByName, useGetWeaponsNames }