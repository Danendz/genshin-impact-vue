<template>
    <aside class="content-right">
        <Transition name="fade">
            <button v-show="showCharactersSelectionList.show" @click="toggleSelectionList"
                class="character-selection-back">X</button>
        </Transition>
        <Transition name="fade-content" mode="out-in">
            <article :style="{width: '100%'}" :key="activeCategory.active_category">
                <component :is="content_component" />
            </article>
        </Transition>
    </aside>
</template>

<script setup lang="ts">
//enums
import { OptionsKeys } from '@/Enums/OptionsKeys';
import { useActiveCategory } from '@/store/ActiveCategory';

//composables
import useToggleCharacterSelelectionList from '@/Composables/useToggleSelectionList';

//stores
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';

//vue
import { defineAsyncComponent, computed } from 'vue'

type OptionsList = {
    [Property in OptionsKeys]: () => Promise<ReturnType<typeof defineAsyncComponent>>;
}
interface Props {
    options_list: OptionsList
}

const props = defineProps<Props>();
const activeCategory = useActiveCategory()
const showCharactersSelectionList = useShowCharactersSelectionList()
const { toggleSelectionList } = useToggleCharacterSelelectionList()

const content_component = computed(() => {
    return defineAsyncComponent(props.options_list[activeCategory.active_category])
})

</script>

<style lang="scss">
.characters-content {
    .content-right {
        background-color: rgba(0, 0, 0, 0.418);
        width: 300px;
        padding: 10px;
        min-height: 50%;
        border-radius: 10px;
        transition: .5s;

        .character-selection-back {
            position: absolute;
            top: 2%;
            right: 20%;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 0;
            background-color: white;
            cursor: pointer;
        }
    }
}

@media only screen and (orientation: portrait) {
    .characters-content {
        .content-right {
            display: flex;
            align-items: center;

        }
    }
}


@media only screen and (max-width: 1800px) {
    .characters-content {
        .content-right {
            .character-selection-back {
                right: 3%;
            }
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-content {
        .content-right {
            background-color: transparent;
            width: 220px;
            padding: 0;
            gap: 5px;
        }
    }
}
</style>