<template>

    <Transition name="fade-left" appear>
        <section v-show="showCharactersSelectionList.show" class="character-selection-main">
            <ButtonWithIcon :accessible-name="'close characters selection panel'" icon="ant-design:close-outlined"
                icon-class="content-right__close-icon" v-show="showCharactersSelectionList.show"
                @click="toggleSelectionList" class="character-selection-back" />
            <aside class="CharacterSelection">
                <header>
                    <!-- <img /> -->
                    <h2>Character Selection</h2>
                </header>
                <CharacterSelectionList />
                <CharacterSelectionFilters />
            </aside>
        </section>
    </Transition>
</template>

<script setup lang="ts">
//components
import CharacterSelectionList from './CharacterSelectionList.vue';
import CharacterSelectionFilters from './CharacterSelectionFilters.vue';
import ButtonWithIcon from '@/components/UI/ButtonWithIcon.vue'

//stores
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';
import useToggleCharacterSelelectionList from '@/Composables/useToggleSelectionList';

const showCharactersSelectionList = useShowCharactersSelectionList()

const { toggleSelectionList } = useToggleCharacterSelelectionList()

</script>

<style lang="scss">
@import '@/assets/Styles/colors';



.character-selection-main {
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content;
    height: 100vh;

    .character-selection-back {
        position: absolute;
        left: 78vw;
        top: 25px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 0;
        background-color: white;
        cursor: pointer;
    }

    .CharacterSelection {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 100%;
        height: 100vh;

        header {
            h2 {
                color: $main_color;
            }
        }
    }
}

@media only screen and (orientation: portrait) {
    .character-selection-main {
        display: none;
    }
}

@media only screen and (max-width: 1800px) {
    .character-selection-main {
        .character-selection-back {
            top: 30px;
            left: 94vw;
        }
    }
}

@media only screen and (max-width: 915px) {
    .character-selection-main {
        .character-selection-back {
            top: 10px;
            left: 93vw;
        }

        .CharacterSelection {
            header {
                h2 {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
