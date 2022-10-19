<template>
    <LazyImg :options="{
    src: CharacterHelper.getCharacterImage(props.character.name_key, CharacterImage.ICON_SIDE),
    loading: CharacterHelper.getPlaceholderIcon(CharacterImage.ICON_SIDE),
    alt: props.character.name,
    delay: 200
    }"
        :class="['characters-scroll__icon-side',{'characters-scroll__icon-side_active': store.currentCharacterIndex === props.index}]" />
</template>

<script setup lang="ts">
//components
import LazyImg from '@/components/UI/Lazy-Img.vue';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

interface Props {
    character: Character,
    index: number,
}

const props = defineProps<Props>()

const store = useCurrentCharacter()
</script>

<style lang="scss">
.characters-scroll__character {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: flex-end;
    border-radius: 50%;
    min-width: 55px;
    min-height: 55px;
    transition: .3s;
    border: 3px solid #6c9992;
    cursor: pointer;

    &_active,
    &:hover {
        background-color: #5bb8d9;
        border: 3px solid #7ec8b9;
    }

    .characters-scroll__icon-side {
        position: absolute;
        transform: translateX(5px);
        width: auto;
        height: 100%;
        border-bottom-left-radius: 35%;
        border-bottom-right-radius: 50%;
        transition: .3s;

        &_active {
            transform: translateX(5px) scale(1.15) translateY(-3px);
        }
    }
}

@media only screen and (max-width: 915px) {
    .characters-scroll__character {
        min-width: 50px;
        min-height: 50px;


        .characters-scroll__icon-side {
            width: auto;
            height: 100%;
        }
    }
}

@media only screen and (max-width: 375px) {
    .characters-scroll__character {
        min-width: 45px;
        min-height: 45px;
    }
}

@media only screen and (max-width: 360px) {
    .characters-scroll__character {
        min-height: 30px;
        min-width: 30px;
    }
}
</style>