<template>
    <aside class="rightContent">
        <Transition name="fade">
            <button v-show="hideLayout.hide" @click="hideLayout.setHide()" class="character-selection-back">X</button>
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

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

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

const content_component = computed(() => {
    return defineAsyncComponent(props.options_list[activeCategory.active_category])
})


const hideLayout = useHideMainCharactersLayout()
</script>

<style lang="scss">
.characters-content {
    .rightContent {
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
        .rightContent {
            display: flex;
            align-items: center;

        }
    }
}


@media only screen and (max-width: 1800px) {
    .characters-content {
        .rightContent {
            .character-selection-back {
                right: 3%;
            }
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-content {
        .rightContent {
            background-color: transparent;
            width: 220px;
            padding: 0;
            gap: 5px;


        }

    }
}
</style>