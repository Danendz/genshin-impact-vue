<template>
    <PreventClickEvent :is-scrolling="isScrolling" @click-function="setCurrentCharacter" v-if="store.currentCharacter"
        :class="['character-card', { 'active-character-card': character.name_key === store.currentCharacter.name_key }]">

        <div :class="['character-top-bg', `rarity-${character.rarity}`]"></div>
        <LazyImg :options="{
            src: CharacterHelper.getCharacterImage(character.name_key, CharacterImage.ICON_BIG_LQ),
            loading: CharacterHelper.getPlaceholderIcon(CharacterImage.ICON_BIG),
            delay: 300,
            alt: 'character'
        }" class="character-icon" />
        <LazyImg :options="{
            src: CharacterHelper.getElementImage(character.vision.toLowerCase()),
            delay: 300,
            alt: 'vision'
        }" class="vision-icon" />
        <figcaption class="character-lvl">Lvl 90</figcaption>

    </PreventClickEvent>
</template>

<script setup lang="ts">
//components
import PreventClickEvent from '@/components/ComponentHelpers/PreventClickEvent.vue'
import LazyImg from './Lazy-Img.vue';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter'

interface Props {
    character: Character,
    characterIndex: number,
    isScrolling: boolean
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
    width: 100%;
    height: 100%;
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
    overflow: hidden;

    .character-top-bg,
    .character-icon {
        border-radius: 4px;
        height: 85%;
        margin-bottom: auto;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 25%;
    }

    .character-top-bg {
        position: absolute;
        width: 100%;
        top: 0;
        z-index: -1;
    }

    .character-icon {
        transition: .3s;
        width: auto;
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

    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 0px 3px 2px white;
    }

    &:active {
        transform: translateY(2px);
    }

    &:focus {
        transform: translateX(29px);
    }
}

.active-character-card {
    box-shadow: 0px 0px 5px 2px white;
    transform: scale(1.04);

    &:hover {
        box-shadow: 0px 0px 5px 2px white;
        transform: scale(1.04);
    }
}

@media only screen and (max-width: 915px) {
    .character-card {
        .vision-icon {
            width: 20px;
        }

        .character-lvl {
            font-size: 10px;
        }
    }
}
</style>