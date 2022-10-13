<template>
    <section class="filter-container">
        <label class="filter-container__title">{{filterTitle[props.keyTitle]}}</label>
        <div class="filter-container__options-container">
            <FilterOption v-for="option, index in props.options" :key="option" :index="index" :option="option"
                :option-key="props.keyTitle" />
        </div>
    </section>
</template>

<script setup lang="ts">
//components
import FilterOption from './FilterOption.vue';

//stores
import { filter, FilterType } from '@/Interfaces/FilterCharacter'

interface Props {
    keyTitle: keyof FilterType
    options: FilterType[keyof FilterType],
}

const props = defineProps<Props>()

const filterTitle: Record<keyof typeof filter, string> = {
    vision: 'Element',
    weapon: "Weapons",
    rarity: "Rarity",
    nation: "Nation"
}

</script>

<style lang="scss">
.filter-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 23px;
    margin-top: 20px;
    gap: 10px;

    &__options-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    &__title {
        color: #aeb1b6;
    }

}


@media only screen and (max-width: 915px) and (orientation: landscape) {
    .filter-container {
        margin-top: 10px;
        gap: 5px;

        &__title {
            font-size: 15px;
        }
    }
}
</style>