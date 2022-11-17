//api
import WeaponService from '@/API/WeaponService'

//interface
import { Weapon } from '@/Interfaces/WeaponInterface'
import { useGlobalLanguage } from '@/store/globalLanguage'

//types
import { DataResponseType } from '@/Types/DataResponseType'

const weaponService = new WeaponService()
const { getShortLang } = useGlobalLanguage()

const useGetWeaponsNames = async () => {
    const data: DataResponseType<string[]> = await weaponService.getNames()
    return data
}

const useGetWeapons = async (fields?: string[]) => {
    const data: DataResponseType<Weapon[]> = await weaponService.get<Weapon>(fields, getShortLang());
    return data
}

const useGetWeaponByName = async (name: string) => {
    const data: DataResponseType<Weapon> = await weaponService.getByName(name)
    return data
}

export { useGetWeapons, useGetWeaponByName, useGetWeaponsNames }