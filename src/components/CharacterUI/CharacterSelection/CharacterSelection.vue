<template>
    <div class="character-selection-main">
        <aside class="CharacterSelection">
            <header>
                <img />
                <h2>Character Selection</h2>
            </header>
            <section class="character-selection-list">
                <CharacterCard v-for="character, index in characters" :key="index" :character="character" />
            </section>
        </aside>
        <button @click="hideLayout.setHide()" class="character-selection-back">X</button>
    </div>
</template>

<script setup lang="ts">
import { Character } from '@/Interfaces/CharacterInterface';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';
import CharacterCard from '@/components/UI/CharacterCard.vue';
interface Props {
    characters: Character[]
}

const props = defineProps<Props>()
const hideLayout = useHideMainCharactersLayout()

</script>

<style lang="scss">
@import '@/assets/Styles/colors';

.character-selection-main {
    width: 100%;
    position: absolute;
    height: 100vh;

    .CharacterSelection {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 50%;
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
        top: 10px;
        width: 35px;
        height: 35px;
        right: 10px;
        border-radius: 50%;
        border: 0;
        background-color: $main_color;
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .character-selection-main {
        .CharacterSelection {
            .character-selection-list {
                grid-template-columns: 100px 100px 100px;
            }
        }
    }
}
</style>