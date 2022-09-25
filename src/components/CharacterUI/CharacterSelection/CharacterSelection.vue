<template>
    <div class="character-selection-main">
        <aside class="CharacterSelection">
            <header>
                <img />
                <h2>Character Selection</h2>
            </header>
            <section @mousedown="(e: MouseEvent) => e.preventDefault()" ref="characters_scroll"
                class="character-selection-list">
                <CharacterCard v-for="character, index in characters" :key="index" :character="character" />
            </section>
        </aside>
        <button @click="hideLayout.setHide()" class="character-selection-back">X</button>
    </div>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//components
import CharacterCard from '@/components/UI/CharacterCard.vue';

//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//vue
import { ref, onMounted } from 'vue'

interface Props {
    characters: Character[]
}

const props = defineProps<Props>()
const hideLayout = useHideMainCharactersLayout()

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)
onMounted(() => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value, 'vertical')
    }
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

</script>

<style lang="scss">
@import '@/assets/Styles/colors';

.character-selection-main {
    width: 50%;
    position: absolute;
    left:0;
    height: 100vh;

    .CharacterSelection {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 100%;
        max-width: 560px;
        height: 100vh;

        header {
            h2 {
                color: $main_color;
            }
        }

        .character-selection-list {
            width: fit-content;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            display: grid;
            grid-template-columns: 100px 100px 100px 100px 100px;
            gap: 12px;
            padding: 10px 5px;
        }
    }

    .character-selection-back {
        position: absolute;
        top: 20px;
        right: 20%;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 0;
        background-color: white;
        cursor: pointer;
    }
}

@media only screen and (orientation: portrait) {
    .character-selection-main {
        display: none;
    }
}

@media only screen and (max-width: 1600px) {
    .character-selection-main {
        .CharacterSelection {
            .character-selection-list {
                grid-template-columns: 100px 100px 100px;
            }
        }

    }
}

@media only screen and (max-width: 1800px) {
    .character-selection-main {
        .character-selection-back {
            top: 10px;
            right: 10px;
        }

    }
}
</style>
