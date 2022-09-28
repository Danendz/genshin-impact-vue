<template>
    <aside class="rightContent">
        <Transition name="fade">
        <button v-show="hideLayout.hide" @click="hideLayout.setHide()" class="character-selection-back">X</button>
    </Transition>
        <Transition name="fade-content" mode="out-in">
            <article :style="{width: '100%'}" :key="active_content">
                <component :is="content_component" />
            </article>
        </Transition>
    </aside>
</template>

<script setup lang="ts">
//enums
import { OptionsKeys } from '@/Enums/OptionsKeys';

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//vue
import { defineAsyncComponent, computed } from 'vue'

type OptionsList = {
    [Property in OptionsKeys]: () => Promise<ReturnType<typeof defineAsyncComponent>>;
}
interface Props {
    options_list: OptionsList,
    active_content: OptionsKeys
}

const props = defineProps<Props>();

const content_component = computed(() => {
    return defineAsyncComponent(props.options_list[props.active_content])
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
        position: relative;

        .character-selection-back {
            position: absolute;
            top: -10%;
            right: 0;
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


@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-content {
        .rightContent {
            background-color: transparent;
            width: 220px;
            padding: 0;
            gap: 5px;

            .character-selection-back {
                top: -40px;



            }
        }

    }
}
</style>