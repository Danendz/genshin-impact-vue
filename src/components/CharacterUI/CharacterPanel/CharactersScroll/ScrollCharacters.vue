<template>
    <section ref="characters_scroll" class="characters-scroll__characters">
        <PreventClickEvent :is-scrolling="isScrolling" @click-function="changeCharacter"
            :class="['characters-scroll__character', { 'characters-scroll__character_active': getCurrentCharacterIndex === index }]"
            :index="index" v-for="(character, index) in characters" :key="index">

            <ScrollCharacter :character="character" :index="index" />

        </PreventClickEvent>
    </section>
</template>

<script setup lang="ts">
//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//stores
import { useCharacters } from '@/store/Characters/Characters';
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//components
import PreventClickEvent from '@/components/ComponentHelpers/PreventClickEvent.vue';
import ScrollCharacter from './ScrollCharacter.vue'
import { useAutoScroll } from '@/Composables/useAutoScroll'

//vue
import { onMounted, ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';

//createing stores
const { getCurrentCharacterIndex, setCurrentCharacter } = useCurrentCharacter()
const charactersStore = useCharacters()
const hideLayout = useHideMainCharactersLayout()

//characters
const characters = charactersStore.getCharacters

const changeCharacter = (index?: number): void => {
    if (characters.value && index !== undefined) {
        setCurrentCharacter(characters.value[index])
    }
}

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)

const { isScrolling, createScrolling, resetListeners } = useCreateScroll()
const { width } = useWindowSize()

const createScroll = () => {
    if (characters_scroll.value) {
        resetListeners()
        if (width.value <= 915) {
            createScrolling(characters_scroll.value, 'vertical')
        } else {
            createScrolling(characters_scroll.value, 'horizontal')
        }
    }
}

watch(width, () => {
    createScroll()
})

onMounted(() => {
    createScroll()
    scrollToCharacter()
})

//scrolling to current character
const scrollToCharacter = () => {
    if (characters_scroll.value) {
        useAutoScroll(characters_scroll.value, getCurrentCharacterIndex.value)
    }
}

//scrolling to current character after animation
watch(() => hideLayout.hide, () => {
    if (!hideLayout.hide) {
        scrollToCharacter()
    }
})

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-scroll {
    &__characters {
        display: flex;
        gap: 15px;
        width: fit-content;
        transition: .5s;
        user-select: none;
        padding: 5px 0;
    }
}

@media only screen and (max-width: 915px) {
    .characters-scroll {
        &__characters {
            flex-direction: column;
            height: fit-content;
            gap: 10px;
            padding: 5px 5px;
        }
    }
}
</style>