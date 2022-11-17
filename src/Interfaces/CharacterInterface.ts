import { CharacterRarity, CharacterWeapon, CharacterElementKey, CharacterRegionKey, CharacterWeaponType, CharacterElement, CharacterRegion } from '@/Enums/CharacterEnums'

interface BaseInformation {
    name: string,
    name_key: string,
    nation?: CharacterRegion,
    nation_key: CharacterRegionKey,
    weapon?: CharacterWeapon,
    rarity: CharacterRarity,
    weapon_type: CharacterWeaponType,
    vision_key: CharacterElementKey,
    vision?: CharacterElement,
}

interface AdditionalInformation {
    affiliation?: string,
    birthday?: string,
    constellation?: string,
    description?: string
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
    constellations?: TemplateTalent[]
    passiveTalents?: TemplateTalent[],
    skillTalents?: SkillTalent[]
}