<template>
    <section class="filter-buttons">
        <CharacterFilterOptions @toggle-filter-component="toggleFilterComponent" :filter-active="filterActive" />
        <button class="filter" @click="toggleFilterComponent">F</button>
        <select class="sort" v-model="charactersFilters.sort">
            <option v-for="sortOption in sort" :key="sortOption" :value="sortOption">{{sortOption}}</option>
        </select>
        <button @click="reverse" class="reverse">R</button>
    </section>
</template>

<script setup lang="ts">
import { useCharacters } from '@/store/Characters';
import { sort } from '@/Interfaces/FilterCharacter';
import { ref } from 'vue';
import CharacterFilterOptions from './CharacterFilterOptions/CharacterFilterOptions.vue';

const charactersFilters = useCharacters().sortAndFilter
const filterActive = ref(false)

const toggleFilterComponent = (e?: MouseEvent, value?: boolean) => {
    filterActive.value = value ?? !filterActive.value
}

const reverse = () => {
    charactersFilters.reverse = !charactersFilters.reverse
}
</script>

<style lang="scss">
.character-selection-main {
    .CharacterSelection {
        .filter-buttons {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin: 15px 0;

            .filter,
            .reverse,
            .sort {
                border-radius: 20px;
                border: 0;
                height: 30px;
                cursor: pointer;
            }

            .filter,
            .reverse {
                width: 10%;
            }

            .sort {
                width: 70%;
            }
        }
    }
}

@media only screen and (max-width: 740px) and (orientation: landscape) {
    .character-selection-main {
        .CharacterSelection {
            .filter-buttons {

                .filter,.reverse,.sort{
                    height: 20px;
                }
                
                .filter,
                .reverse {
                    width: 15%;
                }
                .sort{
                    width: 60%
                }
            }
        }
    }
}
</style>