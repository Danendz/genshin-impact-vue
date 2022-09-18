<template>
    <transition name="fade" appear>
        <div :key="character.name" :style="backgroundImage"
            :class="`character-background ${character.vision.toLowerCase()} `">
            <img :src="CharacterHelper.getCharacterImage(character.name_key, CharacterImage.GACHA_SPLASH)" />
        </div>
    </transition>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums'

//vue
import { computed } from 'vue'

interface Props {
    character: Character
}

const props = defineProps<Props>()

const backgroundImage = computed(() => {
    return {
        backgroundImage: `url(${CharacterHelper.getCharacterImage(props.character.name_key, CharacterImage.NAMECARD_HQ)})`
    }
})
</script>

<style lang="scss">
@import '@/assets/Styles/vision_colors';

.character-background {
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -9;
    overflow: hidden;

    &::after {
        content: '';
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.116);
        position: absolute;
    }

    img {
        user-select: none;
        -webkit-user-drag: none;
        width: auto;
        height: 100vh;
        margin-top: auto;
    }
}

.anemo {
    background-color: $anemo;
}

.geo {
    background-color: $geo;
}

.hydro {
    background-color: $hydro;
}

.electro {
    background-color: $electro;
}

.pyro {
    background-color: $pyro;
}

.cryo {
    background-color: $cryo;
}
</style>