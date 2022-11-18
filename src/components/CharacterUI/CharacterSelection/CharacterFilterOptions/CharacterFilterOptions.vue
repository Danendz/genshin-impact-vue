<template>
    <transition name="fade-left" appear>
        <section class="filter-options" v-if="props.filterActive">
            <div class="filter-options__container">
                <h2 class="filter-options__title">Filter</h2>
                <FilterContainer v-for="value, key in filter" :key="key" :options="value" :key-title="key" />
            </div>
            <RoundedButtonWithCircle class="filter-options__confirm" @click="emit('toggleFilterComponent')"
                :title="t('characters.confirm')" />
        </section>
    </transition>
</template>

<script setup lang="ts">
//components
import FilterContainer from './FilterContainer.vue';

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//interfaces
import { filter } from '@/Interfaces/FilterCharacter'

//vue
import { watch } from 'vue';
import RoundedButtonWithCircle from '@/components/UI/RoundedButtonWithCircle.vue';
import { useGetTranslator } from '@/Composables/useGetTranslator';

interface Props {
    filterActive: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'toggleFilterComponent', value?: boolean): void
}>()
const { t } = useGetTranslator()

const hideLayout = useHideMainCharactersLayout()

watch(() => hideLayout.hide, () => {
    if (!hideLayout.hide) {
        emit('toggleFilterComponent', false)
    }
})

</script>

<style lang="scss">
.filter-options {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    left: 0;
    background-color: rgba(38, 50, 64, 0.994);
    z-index: 4;
    color: white;
    min-width: calc(100% + 10px);
    width: fit-content;
    height: 100vh;
    padding: 10px 0px 0px 20px;
    user-select: none;

    &__container {
        height: 95%;
        overflow-y: auto;
        overflow-x: hidden;

        .filter-options__title {
            color: #c9c2a6;
            margin-bottom: 20px;
        }
    }

    &__confirm {
        align-self: center;
        margin: 10px 0;
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .filter-options {
        padding: 5px;

        &__container {
            padding-right: 10px;
            padding-bottom: 20px;

            .filter-options__title {
                margin-bottom: 10px;
                font-size: 20px;
            }
        }

        &__confirm {
            height: 30px;
            font-size: 12px;
            margin: 5px 0;
        }
    }

}
</style>
