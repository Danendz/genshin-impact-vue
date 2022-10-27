<template>
    <aside class="content-right">
        <Transition name="fade-content" mode="out-in">
            <article v-if="store.currentCharacter" :style="{ width: '100%', height: '100%' }"
                :key="activeCategory.active_category">
                <component :is="content_component" />
            </article>
        </Transition>
    </aside>
</template>

<script setup lang="ts">
//enums
import { OptionsKeys } from '@/Enums/OptionsKeys';
import { useActiveCategory } from '@/store/ActiveCategory';

import { useCurrentCharacter } from '@/store/currentCharacter'

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
const store = useCurrentCharacter()


const content_component = computed(() => {
    return defineAsyncComponent(props.options_list[activeCategory.active_category])
})

</script>

<style lang="scss">
.characters-content {
    .content-right {
        width: 300px;
        height: 480px;
        transition: .5s;


        &__close-icon {
            width: 25px;
            height: 25px;
        }


    }
}

@media only screen and (orientation: portrait) {
    .characters-content {
        .content-right {
            display: flex;
            margin-left: auto;
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
            width: 220px;
            height: fit-content;
            gap: 5px;


        }
    }
}
</style>