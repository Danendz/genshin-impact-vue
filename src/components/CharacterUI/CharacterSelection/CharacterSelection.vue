<template>
    <Transition name="fade" appear>
        <BackButton :button-type="'back'" :font-size="'22px'" :is-with-background="true" @click="toggleSelectionList"
            class="character-selection-back" v-show="showCharactersSelectionList.show" />
    </Transition>
    <Transition name="fade-left" appear>
        <section v-show="showCharactersSelectionList.show" class="character-selection-main">
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

//stores
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';
import useToggleCharacterSelelectionList from '@/Composables/useToggleSelectionList';
import BackButton from '@/components/UI/BackButton.vue';

const showCharactersSelectionList = useShowCharactersSelectionList()

const { toggleSelectionList } = useToggleCharacterSelelectionList()

</script>

<style lang="scss">
@import '@/assets/Styles/colors';

.character-selection-back {
    position: fixed;
    left: 78vw;
    top: 25px;
}

.character-selection-main {
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content;
    height: 100vh;


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
    .character-selection-back {
        top: 30px;
        left: 95vw;
    }

}

@media only screen and (max-width: 915px) {
    .character-selection-back {
        top: 10px;
        left: 93vw;
    }

    .character-selection-main {


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
