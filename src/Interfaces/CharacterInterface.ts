import { CharacterRarity, CharacterWeapon, CharacterElement, CharacterRegion } from '@/Enums/CharacterEnums'

interface BaseInformation {
    name: string,
    nation: CharacterRegion,
    vision: Element,
    weapon: CharacterWeapon,
    rarity: CharacterRarity,
    vision_key: Uppercase<CharacterElement>,
    weapon_type: Uppercase<CharacterWeapon>
}

interface AdditionalInformation {
    affiliation: string,
    birthday: string,
    constellation: string,
    description: string
}

interface TemplateTalent {
    name: string,
    unlock: string,
    level: number,
    description: string
}

interface SkillTalent extends Omit<TemplateTalent, 'level'> {
    type: string
}

export interface Character extends BaseInformation, AdditionalInformation {
    constellations: TemplateTalent[]
    passiveTalents: TemplateTalent[],
    skillTalents: SkillTalent[]
}