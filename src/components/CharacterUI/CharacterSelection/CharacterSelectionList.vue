<template>
    <section @mousedown="(e: MouseEvent) => e.preventDefault()" ref="characters_scroll"
        class="character-selection-list">
        <TransitionGroup name="character-list">
            <CharacterCard v-for="character, index in characters" :key="character.name_key" :character="character"
                :character-index="index" />
        </TransitionGroup>
    </section>
</template>

<script setup lang="ts">
//components
import CharacterCard from '@/components/UI/CharacterCard.vue';
import useCreateScroll from '@/Composables/useCreateScroll';

//stores
import { useCharacters } from '@/store/Characters';
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//vueUse
import { useWindowSize } from '@vueuse/core';

//vue
import { onMounted, watch, nextTick, ref, computed } from 'vue';

const hideLayout = useHideMainCharactersLayout()
const characterStore = useCurrentCharacter()

const charactersStore = useCharacters()
const characters = computed(() => {
    return charactersStore.getFilteredCharacter
})

//creating vertiacal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)

const { width } = useWindowSize()

watch(width, () => {
    createScroll()
})
let heightWithGap = 152
let columns = 5
const createScroll = () => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value, 'vertical')
        if (width.value <= 740) {
            heightWithGap = 89
            columns = 3
        } else if (width.value <= 915) {
            heightWithGap = 89
            columns = 4
        } else if (width.value <= 1600) {
            columns = 4
        } else {
            heightWithGap = 152
            columns = 5
        }
    }
}
onMounted(() => {
    createScroll();
    if (screen.orientation) {
        screen.orientation.addEventListener("change", () => {
            if (screen.orientation.type === 'portrait-primary') {
                if (hideLayout.hide) {
                    hideLayout.setHide()
                }
            }
        })
    }
})
watch(() => hideLayout.hide, () => {
    nextTick(() => {
        if (hideLayout.hide && characters_scroll.value) {
            characters_scroll.value.scrollTop = heightWithGap * Math.floor((characterStore.currentCharacterIndex / columns))
        }
    })
})


</script>

<style lang="scss">
.character-selection-main {
    .CharacterSelection {
        .character-selection-list {
            width: fit-content;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            display: grid;
            grid-template-columns: repeat(5, 110px);
            grid-auto-rows: 140px;
            gap: 12px;
            padding: 10px 5px;
        }
    }
}

@media only screen and (max-width: 1600px) {
    .character-selection-main {
        .CharacterSelection {
            .character-selection-list {
                grid-template-columns: repeat(4, 100px);
            }
        }

    }
}

@media only screen and (max-width: 915px) {
    .character-selection-main {
        .CharacterSelection {
            .character-selection-list {
                grid-template-columns: repeat(4, 70px);
                grid-auto-rows: 80px;
                gap: 8px;
            }
        }
    }
}

@media only screen and (max-width: 740px) {
    .character-selection-main {
        .CharacterSelection {
            .character-selection-list {
                grid-template-columns: repeat(3, 60px);
            }
        }
    }
}
</style>