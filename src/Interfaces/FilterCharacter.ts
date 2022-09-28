//enums
import { CharacterElement, CharacterRarity, CharacterRegion, CharacterWeapon } from "@/Enums/CharacterEnums"
//interfaces
import { Character } from "./CharacterInterface"

type FilterType = {
    [Property in keyof Pick<Character, "vision" | 'weapon'>]: Record<string, boolean>
}

export type SortType = '' | keyof Pick<Character, 'vision' | 'nation' | 'name' | 'weapon' | 'rarity'>

const createObjectFromEnum = (Enum: Record<string, (string | number)>) => {
    return Object.keys(Enum).reduce((obj, key) => {
        return { ...obj, [Enum[key as keyof typeof Enum].toString()]: false }
    }, {})
}

const rarity = createObjectFromEnum(CharacterRarity)
const nation = createObjectFromEnum(CharacterRegion)
const vision = createObjectFromEnum(CharacterElement)
const weapon = createObjectFromEnum(CharacterWeapon)
export const filter: FilterType = {
    vision,
    weapon
}
export const sort: SortType[] = [
    '',
    'name',
    'nation',
    'rarity',
    'vision',
    'weapon'
]