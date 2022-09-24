<template>
    <div class="characters-central">
        <Transition name="fade-right" appear>
            <ContentOptions v-show="!props.showAllCharacters" :options-list="options_list"
                :active_content="active_content" @set-active-content="setActiveContent" />
        </Transition>
            <Transition name="fade-right" appear>
                <div v-show="!props.showAllCharacters" class="centerContent">

                </div>
            </Transition>
            <Transition name="fade-right" appear>
                <aside v-show="!props.showAllCharacters" class="rightContent">
                    <Transition name="fade-content" mode="out-in">
                        <div :style="{width: '100%'}" :key="active_content">
                            <component :is="content_component" />
                        </div>
                    </Transition>
                </aside>
            </Transition>
        <CharactersBottom />
    </div>
</template>

<script setup lang="ts">
//components
import ContentOptions from './ContentOptions.vue';
import CharactersBottom from './CharactersBottom.vue'

//enums
import { OptionsKeys } from '@/Enums/OptionsKeys';

//vue
import { ref, computed, defineAsyncComponent } from 'vue'

interface Props {
    showAllCharacters: boolean
}

const props = defineProps<Props>()

const options_list = {
    'Attributes': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'Weapons': () => import('./ContentRight/WeaponsContent.vue'),
    'Artifacts': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'Constellation': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'Talents': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'Profile': () => import('./ContentRight/AttributesContent/AttributesContent.vue')
}

const active_content = ref<OptionsKeys>(OptionsKeys.ATTRIBUTES)

const content_component = computed(() => {
    return defineAsyncComponent(options_list[active_content.value])
})
const setActiveContent = (key: OptionsKeys): void => {
    active_content.value = key
}
</script>


<style lang="scss">
.characters-central {
    color: white;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: flex-start;
    text-shadow:
        0.07em 0 black,
        0 0.07em black,
        -0.07em 0 black;
    width: 80%;
    height: 100%;
    margin-top: 10px;

    .rightContent {
        background-color: rgba(0, 0, 0, 0.418);
        width: 300px;
        padding: 10px;
        min-height: 50%;


        border-radius: 10px;
    }
}

@media only screen and (max-width: 1366px) {
    .characters-central {
        width: 95%;
        justify-content: space-between;

    }
}

@media only screen and (orientation: portrait) {
    .characters-central {
        align-items: center;

        .rightContent {
            display: flex;
            align-items: center;

        }
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .characters-central {
        flex-direction: column;
        align-items: center;

        .rightContent {
            width: 85%;
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-central {
        height: 100vh;

        .rightContent {
            background-color: transparent;
            width: 220px;
            padding: 0;
            gap: 5px;
        }
    }
}
</style>

