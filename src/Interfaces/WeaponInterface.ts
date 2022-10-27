import { WeaponLocation, WeaponRarity, WeaponType } from "@/Enums/WeaponEnums";

interface BaseInformation {
    name: string,
    rarity: WeaponRarity,
    type?: WeaponType
    location: string | WeaponLocation
}

interface AdditionalInformation {
    ascensionMaterial?: string,
    baseAttack?: number,
    subStat?: string,
    passiveDesc?: string,
    passiveName?: string
}

export interface Weapon extends BaseInformation, AdditionalInformation { }