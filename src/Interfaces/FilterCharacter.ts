//enums
import { CharacterElement, CharacterRarity, CharacterRegion, CharacterWeapon } from "@/Enums/CharacterEnums"
//interfaces
import { Character } from "./CharacterInterface"

export type FilterType = {
    [Property in keyof Pick<Character, "vision" | 'weapon' | 'rarity' | 'nation'>]: Character[Property][]
}

export type SortType = '' | keyof Pick<Character, 'vision' | 'nation' | 'name' | 'weapon' | 'rarity'>

const createArrayFromEnum = <T>(Enum: Record<string, T>): T[] => {
    const res: T[] = []

    for (const key in Enum) {
        res.push(Enum[key])
    }

    return res
}

const vision = createArrayFromEnum<CharacterElement>(CharacterElement)
const weapon = createArrayFromEnum<CharacterWeapon>(CharacterWeapon)
const rarity = createArrayFromEnum<CharacterRarity>(CharacterRarity)
const nation = createArrayFromEnum<CharacterRegion>(CharacterRegion)

export const filter: FilterType = {
    vision,
    weapon,
    rarity,
    nation
}

export const sort: SortType[] = [
    '',
    'name',
    'nation',
    'rarity',
    'vision',
    'weapon'
]