<template>
    <Transition name="fade">
        <section ref="target" v-if="props.sortActive" class="sort-options-container">
            <figure v-for="sortOption in sort" :key="sortOption" @click="() => chooseSort(sortOption)"
                :class="['sort-option', {active: charactersFilters.sort === sortOption}]">
                <p>{{ sortOption ? sortOption[0].toUpperCase() + sortOption.substring(1) : "All"}}</p>
                <img :class="[{activeImg: charactersFilters.sort === sortOption}]" alt="current"
                    src="@/assets/Icons/complete.webp" />
            </figure>
        </section>
    </Transition>
</template>

<script setup lang="ts">
//store
import { useCharacters } from '@/store/Characters';

//interfaces
import { sort, SortType } from '@/Interfaces/FilterCharacter';

//vue
import { ref } from 'vue'

const target = ref(null)

interface Props {
    sortActive: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'toggleSort'): void
}>()

const charactersFilters = useCharacters().sort

const chooseSort = (sortOption: SortType) => {
    charactersFilters.sort = sortOption
    emit('toggleSort')
}

</script>
<style lang="scss">
.sort-options-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    padding: 4px 4px;
    z-index: 3;
    bottom: 42px;
    width: 70%;
    border-radius: 15px;
    background-color: #4a5267;

    .sort-option {
        color: #e2e2e2;
        padding: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        border-radius: 15px;
        transition: .2s;

        p {
            font-size: 15px;
            font-weight: bold;
        }

        img {
            width: 14px;
            height: auto;
            opacity: 0;

            &.activeImg {
                opacity: 1;
            }
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.103);
        }

        &.active {
            background-color: rgba(255, 255, 255, 0.178);
        }
    }
}

@media only screen and (max-width: 740px) {
    .sort-options-container {
        width: 100%;
        border-radius: 10px;
        bottom: 30px;

        .sort-option {
            padding: 4px;

            border-radius: 10px;

            p {
                font-size: 12px;
            }

            img {
                width: 10px;
                height: 10px;
            }
        }
    }
}
</style>