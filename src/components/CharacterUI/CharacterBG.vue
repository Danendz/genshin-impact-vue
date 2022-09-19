<template>
    <transition name="fade" appear>
        <div :class="`character-background-container ${character.vision.toLowerCase()} `" :key="character.name">
            <transition-group name="fade" appear mode="out-in">
                <div v-if="bgImage" class="character-background" :style="{backgroundImage: `url(${bgImage})`}"></div>
                <img class="gacha-image" v-if="gachaImage" :src="gachaImage" />
                <LoaderContent :key="gachaImage" v-if="gachaImage === '' || bgImage===''" />
            </transition-group>
        </div>
    </transition>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums'

//components
import LoaderContent from '@/components/UI/LoaderContent.vue'

//vue
import { watch, onMounted } from 'vue'
import usePreloadImage from '@/Composables/usePreloadImage';

interface Props {
    character: Character
}

const props = defineProps<Props>()

//preload images
const [gachaImage, loadGachaImage] = usePreloadImage()
const [bgImage, loadBgImage] = usePreloadImage()

const loadAllImages = (): void => {
    loadGachaImage(props.character.name_key, CharacterImage.GACHA_SPLASH)
    loadBgImage(props.character.name_key, CharacterImage.NAMECARD_HQ)
}
onMounted(() => {
    loadAllImages()
})
watch(() => props.character, () => {
    loadAllImages();
})

</script>

<style lang="scss">
@import '@/assets/Styles/vision_colors';

.character-background-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: -9;
    position: absolute;
    overflow: hidden;

    p {
        position: absolute;
    }

    .gacha-image {
        user-select: none;
        -webkit-user-drag: none;
        width: auto;
        height: 100vh;
        margin-top: auto;
        position: absolute;
    }

    .character-background {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100vh;
        position: absolute;

        &::after {
            content: '';
            width: 100%;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.116);
            position: absolute;
        }
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