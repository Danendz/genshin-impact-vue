<template>
    <div class="characters-central">
        <Transition name="fade-right" appear>
            <ContentOptions v-if="!props.hide" :options-list="options_list" :active_content="active_content"
                @set-active-content="setActiveContent" />
        </Transition>
        <Transition name="fade-right" appear>
            <div v-if="!props.hide" class="centerContent">

            </div>
        </Transition>
        <Transition name="fade-right" appear>
            <ContentRight v-if="!props.hide" :options_list="options_list" :active_content="active_content" />
        </Transition>
        <Transition name="fade-down" appear>
            <CharactersBottom v-if="!props.hide" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
//components
import ContentOptions from './ContentOptions.vue';
import CharactersBottom from './CharactersBottom.vue'
import ContentRight from './ContentRight/ContentRight.vue';

//enums
import { OptionsKeys } from '@/Enums/OptionsKeys';

//vue
import { ref, watch } from 'vue'

interface Props {
    hide: boolean
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

const setActiveContent = (key: OptionsKeys): void => {
    active_content.value = key
}
watch(() => props.hide, () => {
    if (props.hide) {
        setActiveContent(OptionsKeys.ATTRIBUTES)
    }
})
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
}

@media only screen and (max-width: 1600px) {
    .characters-central {
        width: 95%;
        justify-content: space-between;
    }
}

@media only screen and (orientation: portrait) {
    .characters-central {
        align-items: center;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .characters-central {
        flex-direction: column;
        align-items: center;
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-central {
        height: 100vh;
    }
}
</style>

