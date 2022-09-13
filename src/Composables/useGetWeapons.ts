//api
import WeaponService from '@/API/WeaponService'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//interface
import { Weapon } from '@/Interfaces/WeaponInterface'

//types
import { DataResponseType } from '@/Types/DataResponseType'

//vue
import { ref } from 'vue'

const characterService = new WeaponService()

const useGetWeapons = () => {
    const weapons = ref<DataResponseType<Weapon[], ErrorMessages.NOT_FOUND> | null>(null)

    const getWeapons = async (): Promise<void> => {
        const data: DataResponseType<Weapon[], ErrorMessages.NOT_FOUND>
            = await characterService.get<Weapon>();
        weapons.value = data
    }
    getWeapons();

    return { weapons }
}

const useGetWeaponByName = (name: string) => {
    const weapon = ref<DataResponseType<Weapon, ErrorMessages.NOT_FOUND> | null>(null)
    const getWeapon = async () => {
        const data: DataResponseType<Weapon, ErrorMessages.NOT_FOUND>
            = await characterService.getByName(name)
        weapon.value = data
    }
    getWeapon();
    return { weapon }
}

export { useGetWeapons, useGetWeaponByName }