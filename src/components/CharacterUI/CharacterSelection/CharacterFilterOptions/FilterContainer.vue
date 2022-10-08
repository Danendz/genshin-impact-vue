<template>
    <section class="filter-container">
        <label class="filterTitle">{{filterTitle[props.keyTitle]}}</label>
        <div class="options-container">
            <FilterOption v-for="optionState, option, index in props.options" :key="option" :index="index"
                :option-state="optionState" :option="option" :option-key="props.keyTitle" />
        </div>
    </section>
</template>

<script setup lang="ts">
//components
import FilterOption from './FilterOption.vue';

//stores
import { useCharacters } from '@/store/Characters';

interface Props {
    options: Record<string, boolean>,
    keyTitle: keyof typeof charactersFilters
}

const props = defineProps<Props>()

const characters = useCharacters()

const charactersFilters = characters.sortAndFilter.filter
const filterTitle: Record<keyof typeof charactersFilters, string> = {
    vision: 'Element',
    weapon: "Weapons",
    rarity: "Rarity",
    nation: "Nation"
}

</script>

<style lang="scss">
.filter-options {
    .filter-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 23px;
        margin-top: 20px;
        gap: 10px;

        .options-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .filterTitle{
            color: #aeb1b6;
        }

    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .filter-options {
        .filter-container {
            margin-top: 10px;
            gap: 5px;
            .filterTitle{
                font-size: 15px;
                
            }
        }
    }
}
</style>