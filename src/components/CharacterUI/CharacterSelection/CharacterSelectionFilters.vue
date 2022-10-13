<template>
    <section class="filters">
        <CharacterFilterOptions @toggle-filter-component="toggleFilterComponent" :filter-active="filterActive" />
        <button class="filters__filter" @click="toggleFilterComponent">F</button>

        <CharacterSortOptions @toggle-sort="toggleSort" :sort-active="sortActive" />
        <button class="filters__sort" @click="toggleSort">

            <span>{{ charactersFilters.sort ? charactersFilters.sort[0].toUpperCase() +
            charactersFilters.sort.substring(1) : "All"}}</span>

            <img alt="filters__arrow" :class="[{'filters__arrow_active': sortActive}]"
                src="@/assets/Icons/triangle-up.webp" />

        </button>
        <button @click="reverse" class="filters__reverse">R</button>
        <CharacterSelectedFilters />
    </section>
</template>

<script setup lang="ts">
//components
import CharacterFilterOptions from './CharacterFilterOptions/CharacterFilterOptions.vue';
import CharacterSortOptions from './CharacterSort/CharacterSortOptions.vue';
import CharacterSelectedFilters from './CharacterSelectedFilters/CharacterSelectedFilters.vue'

//store
import { useCharacters } from '@/store/Characters';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//vue
import { ref, watch } from 'vue';

const charactersFilters = useCharacters().sort
const filterActive = ref(false)
const sortActive = ref(false)
const hideLayout = useHideMainCharactersLayout()

const toggleFilterComponent = (e?: MouseEvent, value?: boolean) => {
    filterActive.value = value ?? !filterActive.value
    if (!filterActive.value) useCharacters().confirm = true;
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
.filters {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 5px 0 10px 0;

    &__filter,
    &__reverse,
    &__sort {
        border: 0;
        height: 30px;
        cursor: pointer;
        background-color: white;
    }

    &__filter,
    &__reverse {
        border-radius: 10px;
        width: 10%;
    }

    &__sort {
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

            .filters__arrow_active {
                transform: rotate(180deg);
            }
        }

    }
}


@media only screen and (max-width: 740px) and (orientation: landscape) {

    .filters {
        margin: 7px 0;
        justify-content: space-between;

        &__filter,
        &__reverse,
        &__sort {
            height: 20px;
        }

        &__filter,
        &__reverse {
            width: 15%;
            font-size: 11px;
        }

        &__sort {
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
</style>