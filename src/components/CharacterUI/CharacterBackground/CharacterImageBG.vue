<template>
    <figure v-if="store.currentCharacter"
        :class="`character-background-container character-background-container_image`">

        <transition name="fade-background" mode="in-out" appear>
            <div alt="character background" :key="bgImage" class="character-background-container__character-background"
                :style="{ backgroundImage: bgImage ? `url(${bgImage})` : 'unset' }"></div>
        </transition>
        <transition name="fade" mode="out-in" appear>

            <img alt="gacha-character" :class="['character-background-container__gacha-image',
            { 'character-background-container__gacha-image_enter': showCharactersSelectionList.show }]"
                v-if="gachaImage" :src="gachaImage" />

        </transition>
    </figure>
</template>

<script setup lang="ts">
//composables
import usePreloadImage from '@/Composables/usePreloadImage';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';
import CharacterHelper from '@/helpers/CharacterHelper';

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
        loadGachaImage(CharacterHelper.getCharacterImage(store.currentCharacter.name_key, CharacterImage.GACHA_SPLASH_LQ))
        loadBgImage(CharacterHelper.getCharacterImage(store.currentCharacter.name_key, CharacterImage.NAMECARD_HQ))
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
}

@media only screen and (max-width: 1600px) {
    .character-background-container {
        &__gacha-image {
            &_enter {
                transform: translateX(5%);
            }
        }
    }
}

@media only screen and (max-width: 915px) {
    .character-background-container {
        &__gacha-image {
            &_enter {
                transform: translateX(0%);
            }
        }
    }
}
</style>