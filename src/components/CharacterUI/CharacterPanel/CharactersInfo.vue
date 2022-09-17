<template>
    <div class="info">
        <img alt="vision" :src="visionImage" />
        <p class="visionAndName">{{currentCharacter.vision}}/ {{currentCharacter.name}}</p>
    </div>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//composables
import useRequireImage from '@/Composables/useRequireImage';

//vue
import { computed } from 'vue'

interface Props {
    currentCharacter: Character
}

const props = defineProps<Props>();

//dynamically changing vision image
const visionImage = computed(() => {
    const image = useRequireImage(`CharacterVisions/${props.currentCharacter.vision}.webp`)
    if (image) {
        return image
    }
    return ''
})

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
            margin-left: 20px;
            margin-right: 10px;
        }
    }
}
</style>