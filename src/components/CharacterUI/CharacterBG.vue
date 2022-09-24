<template>
    <transition name="fade" appear>
        <div v-if="store.currentCharacter"
            :class="`character-background-container ${store.currentCharacter.vision.toLowerCase()} `"
            :key="store.currentCharacter.name">
            <transition-group name="fade" appear mode="out-in">
                <div v-if="bgImage" class="character-background" :style="{backgroundImage: `url(${bgImage})`}"></div>

                <img class="gacha-image" v-if="gachaImage && !storeShowAllCharacters.showAllCharacters"
                    :src="gachaImage" />
                <!-- <LoaderContent :key="gachaImage" v-if="gachaImage === '' || bgImage===''" /> -->
            </transition-group>
            <transition name="translate-right">
                <img class="gacha-image gacha-imgae-right" v-if="storeShowAllCharacters.showAllCharacters" :src="gachaImage" />
            </transition>
        </div>
    </transition>
</template>

<script setup lang="ts">
//enums
import { CharacterImage } from '@/Enums/CharacterEnums'

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useShowAllCharacters } from '@/store/showAllCharacters';


/* //components
import LoaderContent from '@/components/UI/LoaderContent.vue' */

//composables
import usePreloadImage from '@/Composables/usePreloadImage';

//vue
import { watch, onMounted } from 'vue'

const store = useCurrentCharacter();
const storeShowAllCharacters = useShowAllCharacters()

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
    loadAllImages()
})
watch(() => store.currentCharacter, () => {
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
    .gacha-imgae-right{
        transform: translateX(40%);
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