//enums
import { CharacterElement, CharacterRarity, CharacterRegion, CharacterWeapon } from "@/Enums/CharacterEnums"
//interfaces
import { Character } from "./CharacterInterface"

type FilterType = {
    [Property in keyof Pick<Character, "vision" | "rarity" | 'nation' | 'weapon'>]: Record<string, boolean>
}

const createObjectFromEnum = (Enum: Record<string, (string | number)>) => {
    return Object.keys(Enum).reduce((obj, key) => {
        return { ...obj, [Enum[key as keyof typeof Enum].toString()]: true }
    }, {})
}

const vision = createObjectFromEnum(CharacterElement)
const rarity = createObjectFromEnum(CharacterRarity)
const nation = createObjectFromEnum(CharacterRegion)
const weapon = createObjectFromEnum(CharacterWeapon)
export const filter: FilterType = {
    vision,
    rarity,
    nation,
    weapon
}