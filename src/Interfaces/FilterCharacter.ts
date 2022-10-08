//enums
import { CharacterElement, CharacterRarity, CharacterRegion, CharacterWeapon } from "@/Enums/CharacterEnums"
//interfaces
import { Character } from "./CharacterInterface"

export type FilterType = {
    [Property in keyof Pick<Character, "vision" | 'weapon' | 'rarity' | 'nation'>]: Record<string, boolean>
}

export type SortType = '' | keyof Pick<Character, 'vision' | 'nation' | 'name' | 'weapon' | 'rarity'>

const createObjectFromEnum = (Enum: Record<string, (string | number)>) => {
    return Object.keys(Enum).reduce((obj, key) => {
        return { ...obj, [Enum[key as keyof typeof Enum].toString()]: false }
    }, {})
}

export const rarity = createObjectFromEnum(CharacterRarity)
export const nation = createObjectFromEnum(CharacterRegion)
export const vision = createObjectFromEnum(CharacterElement)
export const weapon = createObjectFromEnum(CharacterWeapon)

export const sort: SortType[] = [
    '',
    'name',
    'nation',
    'rarity',
    'vision',
    'weapon'
]