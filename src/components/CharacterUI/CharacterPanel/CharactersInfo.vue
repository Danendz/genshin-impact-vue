<template>
    <figure class="characters-info" v-if="store.currentCharacter">
        <Transition name="fade-up-info" mode="out-in" appear>
            <img :key="store.currentCharacter.vision" alt="vision"
                :src="CharacterHelper.getElementImage(store.currentCharacter.vision.toLowerCase())" />
        </Transition>
        <figcaption class="characters-info__visionAndName">
            <Transition name="fade-up-info" mode="out-in" appear>
                <span :key=" store.currentCharacter.vision">
                    {{store.currentCharacter.vision}}
                </span>
            </Transition>
            <Transition name="fade-up-info" mode="out-in" appear>
                <span :style="{width: '100%', whiteSpace: 'nowrap'}"
                    :key="store.currentCharacter.name">/{{store.currentCharacter.name}}</span>
            </Transition>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

const store = useCurrentCharacter()

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