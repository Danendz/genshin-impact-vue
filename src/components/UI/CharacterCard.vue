<template>
    <figure @click="setCurrentCharacter" v-if="store.currentCharacter"
        :class="['character-card', {'active-character-card': character.name === store.currentCharacter.name}]">
        <div :class="['character-top-bg', `rarity-${character.rarity}`]"></div>
        <img v-lazy="{
            src: CharacterHelper.getCharacterImage(character.name_key, CharacterImage.ICON_BIG),
            loading: CharacterHelper.getPlaceholderIcon(CharacterImage.ICON_BIG)
        }" class="character-icon" alt="character" />
        <img v-lazy="{src: CharacterHelper.getElementImage(character.vision.toLowerCase())}" class="vision-icon"
            alt="vision" />
        <figcaption class="character-lvl">Lvl 90</figcaption>
    </figure>
</template>

<script setup lang="ts">
//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter'

interface Props {
    character: Character
}

const props = defineProps<Props>()
const store = useCurrentCharacter()

const setCurrentCharacter = () => {
    store.setCurrentCharacter(props.character)
}
</script>

<style lang="scss">
@import '@/assets/Styles/rarity_colors';
@import '@/assets/Styles/images_rules';

.character-card {
    width: 100px;
    height: fit-content;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: .3s;

    .character-top-bg {
        position: absolute;
        width: 100%;
        height: 100px;
        top: 0;
        z-index: -1;
        border-radius: 4px;
        border-bottom-right-radius: 25%;
    }

    .character-icon {
        width: auto;

        height: 100px;
        border-bottom-right-radius: 25%;
    }

    .vision-icon {
        position: absolute;
        width: 33px;
        height: auto;
        left: 0;
    }

    .character-lvl {
        user-select: none;
        text-align: center;
    }
}

.active-character-card {
    box-shadow: 0px 0px 5px 2px white;
    transform: scale(1.05);
}
</style>