<template>
    <figure class="characters-info" v-if="store.currentCharacter">
        <img alt="vision" :src="CharacterHelper.getElementImage(store.currentCharacter.vision.toLowerCase())" />
        <figcaption class="characters-info__visionAndName">
            {{store.currentCharacter.vision}}/ {{store.currentCharacter.name}}
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
        width: auto;
        height: $infoHeight;
    }

    &__visionAndName {
        color: #e0dac0;
    }
}

@media only screen and (max-width: 915px) {
    .characters-info {
        width: fit-content;

        img {
            height: 30px;
            margin-left: 15px;
            margin-right: 10px;
        }
    }
}
</style>