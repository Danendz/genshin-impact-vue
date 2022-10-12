<template>
    <transition name="fade-left" appear>
        <section class="filter-options" v-if="props.filterActive">
            <div class="filter-options__container">
                <h2 class="filter-options__title">Filter</h2>
                <FilterContainer v-for="value, key in charactersFilters" :key="key" :options="value" :key-title="key" />
            </div>
            <button class="filter-options__confirm" @click="emit('toggleFilterComponent')">Confirm Filter</button>
        </section>
    </transition>
</template>

<script setup lang="ts">
//components
import FilterContainer from './FilterContainer.vue';

//stores
import { useCharacters } from '@/store/Characters';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//vue
import { watch, computed } from 'vue';


interface Props {
    filterActive: boolean
}

const characters = useCharacters()
const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'toggleFilterComponent', e?: MouseEvent, value?: boolean): void
}>()

const hideLayout = useHideMainCharactersLayout()

watch(() => hideLayout.hide, () => {
    if (!hideLayout.hide) {
        emit('toggleFilterComponent', undefined, false)
    }
})


const charactersFilters = computed(() => characters.sortAndFilter.filter)

</script>

<style lang="scss">
.filter-options {
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 0;
    left: 0;
    background-color: rgba(38, 50, 64, 0.994);
    z-index: 4;
    color: white;
    width: calc(100% + 10px);
    height: 100vh;
    padding: 10px 20px;
    user-select: none;

    &__container {
        height: 90%;
        overflow-y: auto;
        overflow-x: hidden;

        .filter-options__title {
            color: #c9c2a6;
            margin-bottom: 20px;
        }
    }

    &__confirm {
        margin-top: auto;
        height: 35px;
        border-radius: 15px;
        border: 0;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 5px;
        cursor: pointer;
        color: rgba(38, 50, 64, 0.994);

        transition: .3s;

        background-color: rgba(255, 255, 255, 0.575);

        &:hover {
            background-color: rgba(255, 255, 255, 0.928);
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .filter-options {
        padding: 5px;

        &__container {
            padding-right: 10px;

            .filter-options__title {
                margin-bottom: 10px;
                font-size: 20px;
            }
        }

        &__confirm {
            height: 30px;
            margin-bottom: 0px;
            font-size: 12px;
        }
    }

}
</style>
