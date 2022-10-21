<template>
    <figure class="characters-info" v-if="store.currentCharacter">
        <GsapTransition :is-appear="true" :options="infoTransition" mode="out-in" :custom-index="0">
            <img :key="store.currentCharacter.vision" alt="vision"
                :src="CharacterHelper.getElementImage(store.currentCharacter.vision.toLowerCase())" />
        </GsapTransition>
        <figcaption class="characters-info__visionAndName">
            <GsapTransition :is-appear="true" :options="infoTransition" mode="out-in" :custom-index="1">
                <span :key=" store.currentCharacter.vision">
                    {{store.currentCharacter.vision}}
                </span>
            </GsapTransition>
            <GsapTransition :is-appear="true" :options="infoTransition" mode="out-in" :custom-index="2">
                <span :style="{width: '100%', whiteSpace: 'nowrap'}"
                    :key="store.currentCharacter.name">/{{store.currentCharacter.name}}</span>
            </GsapTransition>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

//interfaces
import { IOptions } from '@/Interfaces/GsapTransitionOptions';

//components
import GsapTransition from '@/components/ComponentHelpers/GsapTransition.vue'

const store = useCurrentCharacter()

const infoTransition: IOptions = {
    beforeEnter: {
        opacity: 0,
        transform: 'translateY(50%)'
    },
    enter: {
        opacity: 1,
        duration: 0.2,
        transform: 'translateY(0)'
    },
    leave: {
        opacity: 0,
        duration: 0.4,
        transform: 'translateY(-30%)'
    }
}
</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-info {
    display: flex;
    align-items: center;
    width: 25%;
    height: $infoHeight;
    gap: 10px;

    img {
        width: 45px;
        height: $infoHeight;
    }

    &__visionAndName {

        transition: .3s;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #e0dac0;
    }
}

@media only screen and (max-width: 915px) {
    .characters-info {
        width: fit-content;

        img {
            width: 30px;
            height: 30px;
            margin-left: 15px;
            margin-right: 10px;
        }
    }
}
</style>