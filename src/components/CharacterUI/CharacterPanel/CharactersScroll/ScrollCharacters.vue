<template>
    <section ref="characters_scroll" class="characters-scroll__characters">
        <PreventClickEvent @click-function="changeCharacter"
            :class="['characters-scroll__character', {'characters-scroll__character_active': store.currentCharacterIndex === index}]"
            :index="index" v-for="(character, index) in characters" :key="index">

            <ScrollCharacter :character="character" :index="index" />

        </PreventClickEvent>
    </section>
</template>

<script setup lang="ts">
//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//stores
import { useCharacters } from '@/store/Characters';
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//components
import PreventClickEvent from '@/components/ComponentHelpers/PreventClickEvent.vue';
import ScrollCharacter from './ScrollCharacter.vue'

//vue
import { nextTick, onMounted, ref, watch } from 'vue';

//createing stores
const store = useCurrentCharacter()
const charactersStore = useCharacters()
const hideLayout = useHideMainCharactersLayout()

//characters
const characters = charactersStore.getCharacters

const changeCharacter = (index?: number): void => {
    if (characters.value && index) {
        store.setCurrentCharacter(characters.value[index])
    }
}

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)
let scrollTypes: 'scrollLeft' | 'scrollTop' = 'scrollLeft'
let heightWithGap = 70;
const createScroll = () => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value, 'horizontal')
        if (screen.availWidth <= 915) {
            heightWithGap = 65
            scrollTypes = 'scrollTop'
        }
    }
}
onMounted(() => {
    createScroll()
    scrollToCharacter()
})

//scrolling to current character
const scrollToCharacter = () => {
    if (characters_scroll.value && !hideLayout.hide) {
        characters_scroll.value[scrollTypes] = heightWithGap * store.currentCharacterIndex
    }
}

//scrolling to current character after animation
watch(() => hideLayout.hide, () => {
    nextTick(() => {
        scrollToCharacter()
    })
})

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-scroll {
    &__characters {
        display: flex;
        gap: 15px;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        transition: .5s;
        user-select: none;
        padding: 5px 0;
    }
}

@media only screen and (max-width: 915px) {
    .characters-scroll {
        &__characters {
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: scroll;
            height: calc(100vh - $infoHeight);
            gap: 10px;
            padding: 0px 5px;
            background-color: $transparency;
        }
    }
}
</style>