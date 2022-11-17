//enums
import { CharacterElementKey, CharacterRarity, CharacterRegionKey, CharacterWeaponType } from "@/Enums/CharacterEnums"
//interfaces
import { Character } from "./CharacterInterface"

export type FilterType = {
    [Property in keyof Pick<Character, "vision_key" | 'weapon_type' | 'rarity' | 'nation_key'>]: Character[Property][]
}

export type SortType = '' | keyof Pick<Character, 'vision_key' | 'nation_key' | 'name' | 'weapon_type' | 'rarity'>

const createArrayFromEnum = <T>(Enum: Record<string, T>): T[] => {
    const res: T[] = []

    for (const key in Enum) {
        res.push(Enum[key])
    }

    return res
}

const vision_key = createArrayFromEnum<CharacterElementKey>(CharacterElementKey)
const weapon_type = createArrayFromEnum<CharacterWeaponType>(CharacterWeaponType)
const rarity = createArrayFromEnum<CharacterRarity>(CharacterRarity)
const nation_key = createArrayFromEnum<CharacterRegionKey>(CharacterRegionKey)

export const filter: FilterType = {
    vision_key,
    weapon_type,
    rarity,
    nation_key
}

export const sort: SortType[] = [
    '',
    'name',
    'nation_key',
    'rarity',
    'vision_key',
    'weapon_type'
]