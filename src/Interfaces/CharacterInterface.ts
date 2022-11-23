import { CharacterRarity, CharacterElementKey, CharacterRegionKey, CharacterWeaponType } from '@/Enums/CharacterEnums'

interface BaseInformation {
    name: string,
    name_key: string,
    rarity: CharacterRarity,
    nation_key: CharacterRegionKey,
    weapon_type: CharacterWeaponType,
    vision_key: CharacterElementKey,
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