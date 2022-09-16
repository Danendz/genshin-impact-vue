<template>
    <transition name="fade">
        <div :key="character.name" :style="backgroundCard"
            :class="`character-background ${character.vision.toLowerCase()} `">
        </div>
    </transition>
</template>

<script setup lang="ts">
import { Character } from '@/Interfaces/CharacterInterface';
import { computed } from 'vue'
import useRequireImage from '@/Composables/useRequireImage'
interface Props {
    character: Character
}
const props = defineProps<Props>()

const backgroundCard = computed(() => {

    const name = props.character.name.toLowerCase().replaceAll(' ', '-')
    const image = useRequireImage(name)
    return {
        backgroundImage: `url(${image})`
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>