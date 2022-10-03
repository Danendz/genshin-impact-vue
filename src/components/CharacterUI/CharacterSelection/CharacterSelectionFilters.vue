<template>
    <section class="filter-buttons">
        <CharacterFilterOptions @toggle-filter-component="toggleFilterComponent" :filter-active="filterActive" />
        <button class="filter" @click="toggleFilterComponent">F</button>

        <CharacterSortOptions @toggle-sort="toggleSort" :sort-active="sortActive" />
        <button class="sort" @click="toggleSort">

            <span>{{ charactersFilters.sort ? charactersFilters.sort[0].toUpperCase() +
            charactersFilters.sort.substring(1) : "All"}}</span>

            <img alt="arrow" :class="[{active: sortActive}]" src="@/assets/Icons/triangle-up.webp" />
            
        </button>
        <button @click="reverse" class="reverse">R</button>
    </section>
</template>

<script setup lang="ts">
//components
import CharacterFilterOptions from './CharacterFilterOptions/CharacterFilterOptions.vue';
import CharacterSortOptions from './CharacterSort/CharacterSortOptions.vue';

//store
import { useCharacters } from '@/store/Characters';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//vue
import { ref, watch } from 'vue';

const charactersFilters = useCharacters().sortAndFilter
const filterActive = ref(false)
const sortActive = ref(false)
const hideLayout = useHideMainCharactersLayout()

const toggleFilterComponent = (e?: MouseEvent, value?: boolean) => {
    filterActive.value = value ?? !filterActive.value
}

const toggleSort = () => {
    sortActive.value = !sortActive.value
}

const reverse = () => {
    charactersFilters.reverse = !charactersFilters.reverse
}

watch(() => hideLayout.hide, () => {
    sortActive.value = false
})
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
                border: 0;
                height: 30px;
                cursor: pointer;
                background-color: white;
            }

            .filter,
            .reverse {
                border-radius: 10px;
                width: 10%;
            }

            .sort {
                border-radius: 20px;
                width: 70%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                span {
                    font-weight: bold;
                    color: #4a5267;
                    font-size: 15px;
                    margin-left: 10px;
                }

                img {
                    width: 10px;
                    height: auto;
                    margin-right: 10px;
                    transition: .3s;

                    &.active {
                        transform: rotate(180deg);
                    }
                }

            }
        }
    }
}

@media only screen and (max-width: 740px) and (orientation: landscape) {
    .character-selection-main {
        .CharacterSelection {
            .filter-buttons {

                .filter,
                .reverse,
                .sort {
                    height: 20px;
                }

                .filter,
                .reverse {
                    width: 15%;
                    font-size: 11px;
                }

                .sort {
                    span {
                        font-size: 12px;
                    }
                    img {
                        width: 7px;
                    }
                    width: 60%
                }
            }
        }
    }
}
</style>