<template>
    <section class="filter-container">
        <label class="filter-container__title">{{ t(`characters.filter-options.titles.${keyTitle}`) }}</label>
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
import { FilterType } from '@/Interfaces/FilterCharacter'
import { useGetTranslator } from '@/Composables/useGetTranslator'

interface Props {
    keyTitle: keyof FilterType
    options: FilterType[keyof FilterType],
}

const props = defineProps<Props>()
const { t } = useGetTranslator()

</script>

<style lang="scss">
.filter-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 23px;
    margin-top: 20px;
    padding: 0px 20px 10px 0px;
    gap: 10px;

    &__options-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    &__title {
        font-family: Genshin, Arial, Helvetica, sans-serif;
        font-size: 20px;
        color: #aeb1b6;
    }

}


@media only screen and (max-width: 915px) and (orientation: landscape) {
    .filter-container {
        margin-top: 10px;
        gap: 5px;

        &__title {
            font-size: 13px;
        }
    }
}
</style>