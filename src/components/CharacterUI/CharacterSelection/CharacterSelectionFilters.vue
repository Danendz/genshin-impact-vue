<template>
    <section class="filters">
        <CharacterFilterOptions @toggle-filter-component="toggleFilterComponent" :filter-active="filterActive" />

        <ButtonWithIcon @click="() => toggleFilterComponent()" class="filters__filter" icon="el:filter"
            icon-class="filters__filter-icon" />

        <TogglerWithList :translate-path="'characters.sort-options'" :active-option="charactersFilters.sort"
            :options="sort" @choose-option="chooseSort" />

        <ButtonWithIcon icon="bx:sort" @click="reverse" class="filters__reverse" icon-class="filters__reverse-icon" />
        <CharacterSelectedFilters />
    </section>
</template>

<script setup lang="ts">
//components
import CharacterFilterOptions from './CharacterFilterOptions/CharacterFilterOptions.vue';
import CharacterSelectedFilters from './CharacterSelectedFilters/CharacterSelectedFilters.vue'
import ButtonWithIcon from '@/components/UI/ButtonWithIcon.vue';
import TogglerWithList from '@/components/UI/toggler/TogglerWithList.vue';

//store
import { useCharacters } from '@/store/Characters/Characters';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

import { sort, SortType } from '@/Interfaces/FilterCharacter';

//vue
import { ref, watch } from 'vue';

const charactersFilters = useCharacters().sort
const filterActive = ref(false)
const sortActive = ref(false)
const hideLayout = useHideMainCharactersLayout()

const toggleFilterComponent = (value?: boolean) => {
    filterActive.value = value ?? !filterActive.value
    if (!filterActive.value) useCharacters().confirm = true;
}

const chooseSort = (value: string) => {
    charactersFilters.sort = value as SortType;
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
    user-select: none;

    &__reverse-icon {
        width: 20px;
        height: 20px;
    }

    &__filter,
    &__reverse {
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

}

@media only screen and (max-width: 915px) {
    .filters {
        margin: 2px 0 10px 0;
        z-index: 5;

        &__reverse-icon {
            width: 16px;
            height: 16px;
        }

        &__filter,
        &__reverse {
            height: 23px;
        }

        &__filter,
        &__reverse {
            width: 15%;
        }
    }
}


@media only screen and (max-width: 740px) {
    .filters {
        justify-content: space-between;

        &__filter,
        &__reverse {
            height: 20px;
        }
    }
}
</style>