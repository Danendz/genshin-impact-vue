<template>
    <transition name="fade-background" appear>
        <figure v-if="store.currentCharacter"
            :class="`character-background-container character-background-container_image character-background-container_${store.currentCharacter.vision.toLowerCase()}`"
            :key="store.currentCharacter.name_key">

            <transition name="fade" appear>
                <div alt="character background" v-if="bgImage"
                    class="character-background-container__character-background"
                    :style="{backgroundImage: `url(${bgImage})`}"></div>
            </transition>
            <transition name="fade-right" appear>

                <img alt="gacha-character" :class="['character-background-container__gacha-image',
                {'character-background-container__gacha-image_enter': showCharactersSelectionList.show}]"
                    v-if="gachaImage" :src="gachaImage" />

            </transition>
        </figure>
    </transition>
</template>

<script setup lang="ts">
//composables
import usePreloadImage from '@/Composables/usePreloadImage';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';

//vue
import { watch, onMounted } from 'vue';

const store = useCurrentCharacter();
const showCharactersSelectionList = useShowCharactersSelectionList()

//preload images
const [gachaImage, loadGachaImage] = usePreloadImage()
const [bgImage, loadBgImage] = usePreloadImage()

const loadAllImages = (): void => {
    if (store.currentCharacter) {
        loadGachaImage(store.currentCharacter.name_key, CharacterImage.GACHA_SPLASH)
        loadBgImage(store.currentCharacter.name_key, CharacterImage.NAMECARD_HQ)
    }
}

onMounted(() => {
    if (store.currentCharacter) {
        loadAllImages()
    }
})

watch(() => store.currentCharacter, () => {
    if (store.currentCharacter) {
        loadAllImages()
    }
})
</script>

<style lang="scss">
@import '@/assets/Styles/vision_colors';
@import '@/assets/Styles/CharacterUI/CharacterBackground/CharacterBackground';

.character-background-container {
    &_image {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -9;
    }

    &__character-background {
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

    &__gacha-image {
        user-select: none;
        -webkit-user-drag: none;
        width: auto;
        height: 100vh;
        margin-top: auto;
        transition: .5s;
        position: absolute;

        &_enter {
            transform: translateX(5%);
        }
    }

    &_anemo {
        background-color: $anemo;
    }

    &_geo {
        background-color: $geo;
    }

    &_hydro {
        background-color: $hydro;
    }

    &_electro {
        background-color: $electro;
    }

    &_pyro {
        background-color: $pyro;
    }

    &_cryo {
        background-color: $cryo;
    }
}

@media only screen and (max-width: 1600px) {
    .character-background-container {
        &__gacha-image {
            &_enter {
                transform: translateX(15%);
            }
        }
    }
}
</style>