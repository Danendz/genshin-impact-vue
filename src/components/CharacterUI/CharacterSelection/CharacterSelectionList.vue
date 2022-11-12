<template>
    <section @mousedown="(e: MouseEvent) => e.preventDefault()" :class="['character-selection-list',
    {'character-selection-list_filter-active': filteredOptions.length}]">
        <section class="character-selection-list__characters" ref="characters_scroll">
            <p v-if="characters && !characters.length" class="character-selection-list__no-characters">No characters
                found!</p>
            <TransitionGroup v-else :css="false">
                <CharacterCard v-for="character, index in characters" :key="character.name_key" :character="character"
                    :character-index="index" :is-scrolling="isScrolling" />
            </TransitionGroup>
        </section>
    </section>
</template>

<script setup lang="ts">
//components
import CharacterCard from '@/components/UI/CharacterCard.vue';
import useCreateScroll from '@/Composables/useCreateScroll';
import useSetDefaultLayout from '@/Composables/useSetDefaultLayout';

//stores
import { useCharacters } from '@/store/Characters/Characters';
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';

//vueUse
import { useWindowSize } from '@vueuse/core';
//vue
import { onMounted, watch, nextTick, ref } from 'vue';

const setDefaultLayout = useSetDefaultLayout()
const characterStore = useCurrentCharacter()
const charactersStore = useCharacters()

const characters = charactersStore.getFilteredCharacter;
const filteredOptions = charactersStore.getSelectedFilterOptions
const showCharactersSelectionList = useShowCharactersSelectionList()


//creating vertiacal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)

const { isScrolling, createScrolling } = useCreateScroll()

const { width } = useWindowSize()

watch(width, () => {
    setColumnsWithHeight()
})

let heightWithGap = 152
let columns = 5

const createScroll = () => {
    if (characters_scroll.value) {
        createScrolling(characters_scroll.value, 'vertical')
        setColumnsWithHeight()
    }
}

const setColumnsWithHeight = () => {
    if (width.value <= 740) {
        heightWithGap = 89
        columns = 3
    } else if (width.value <= 915) {
        heightWithGap = 89
        columns = 4
    } else if (width.value <= 1600) {
        heightWithGap = 152
        columns = 4
    } else {
        heightWithGap = 152
        columns = 5
    }
}

onMounted(() => {
    createScroll();
    if (screen.orientation) {
        screen.orientation.addEventListener("change", () => {
            if (screen.orientation.type === 'portrait-primary') {
                if (showCharactersSelectionList.show) {
                    setDefaultLayout.setLayout()
                }
            }
        })
    }
})
watch(() => showCharactersSelectionList.show, () => {
    nextTick(() => {
        if (showCharactersSelectionList.show && characters_scroll.value && characters_scroll.value.parentElement) {
            characters_scroll.value.parentElement.style.scrollBehavior = 'smooth'
            characters_scroll.value.parentElement.scrollTop = heightWithGap * Math.floor((characterStore.currentCharacterIndex / columns))
        }
    })
})

</script>

<style lang="scss">
.character-selection-list {
    width: fit-content;
    height: 100%;
    position: relative;

    &__characters {
        display: grid;
        grid-template-columns: repeat(5, 110px);
        grid-auto-rows: 140px;
        height: fit-content;
        gap: 12px;
        padding: 10px 5px;
    }

    &__characters::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    &_filter-active {
        padding-bottom: 45px;
    }

    &__no-characters {
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: white;
        position: absolute;
    }
}

@media only screen and (max-width: 1600px) {

    .character-selection-list {
        &__characters {
            grid-template-columns: repeat(4, 110px);
        }
    }
}


@media only screen and (max-width: 915px) {

    .character-selection-list {
        &__characters {
            grid-template-columns: repeat(4, 70px);
            grid-auto-rows: 80px;
            gap: 8px;
        }

        &__no-characters {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: white;
            position: absolute;
        }
    }
}

@media only screen and (max-width: 740px) {

    .character-selection-list {
        &__characters {
            grid-template-columns: repeat(3, 60px);
        }
    }
}
</style>