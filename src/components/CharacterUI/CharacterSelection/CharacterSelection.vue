<template>
    <section class="character-selection-main">
        <aside class="CharacterSelection">
            <header>
                <!-- <img /> -->
                <h2>Character Selection</h2>
            </header>
            <section @mousedown="(e: MouseEvent) => e.preventDefault()" ref="characters_scroll"
                class="character-selection-list">
                <CharacterCard v-for="character, index in props.characters" :key="index" :character="character"
                    :character-index="index" />
            </section>
        </aside>
        <button @click="hideLayout.setHide()" class="character-selection-back">X</button>
    </section>
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
import { useCurrentCharacter } from '@/store/currentCharacter';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>()
const hideLayout = useHideMainCharactersLayout()
const store = useCurrentCharacter()

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)

onMounted(() => {
    let heightWithGap = 152
    let columns = 5
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value, 'vertical')
        if (screen.availWidth <= 740) {
            heightWithGap = 89
            columns = 3
        } else if (screen.availWidth <= 915) {
            heightWithGap = 89
            columns = 4
        } else if (screen.availWidth <= 1600) {
            columns = 4
        }
        characters_scroll.value.scrollTop += heightWithGap * Math.floor(store.currentCharacterIndex / columns)
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
    top: 0;
    left: 0;
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
            grid-template-columns: repeat(5, 110px);
            grid-auto-rows: 140px;
            gap: 12px;
            padding: 10px 5px;
        }
    }

    .character-selection-back {
        position: absolute;
        top: 20px;
        right: -60%;
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
                grid-template-columns: repeat(4, 100px);
            }
        }

    }
}

@media only screen and (max-width: 915px) {
    .character-selection-main {
        .CharacterSelection {

            header {
                h2 {
                    font-size: 20px;
                }
            }

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

@media only screen and (max-width: 1800px) {
    .character-selection-main {
        .character-selection-back {
            top: 10px;
            right: -95%;
        }

    }
}
</style>
