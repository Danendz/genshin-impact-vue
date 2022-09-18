<template>
    <div class="info">
        <img alt="vision" :src="CharacterHelper.getElementImage(props.currentCharacter.vision.toLowerCase())" />
        <p class="visionAndName">{{currentCharacter.vision}}/ {{currentCharacter.name}}</p>
    </div>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

interface Props {
    currentCharacter: Character
}

const props = defineProps<Props>();

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.info {
    display: flex;
    align-items: center;
    width: 25%;
    height: $infoHeight;
    gap: 10px;

    img {
        width: auto;
        height: $infoHeight;
    }

    .visionAndName {
        color: #e0dac0;
    }
}

@media only screen and (max-width: 915px) {
    .info {
        width: fit-content;

        img {
            height: 30px;
            margin-left: 15px;
            margin-right: 10px;
        }
    }
}
</style>