<template>
    <section :class="['characters-content', {'hided': changedStyle}]">
        <Transition @after-leave="changedStyle = true" @before-enter="changedStyle = false"
            @after-enter="setDefaultSort" name="fade-right" appear>
            <ContentOptions v-show="!props.hide" :options-list="options_list" :active_content="active_content"
                @set-active-content="setActiveContent" />
        </Transition>
        <Transition name="fade-right" appear>
            <section v-if="!props.hide" class="centerContent">

            </section>
        </Transition>
        <Transition name="fade-right" appear>
            <ContentRight :options_list="options_list" :active_content="active_content" />
        </Transition>
        <Transition name="fade-down" appear>
            <CharactersBottom v-show="!props.hide" />
        </Transition>
    </section>
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
import { useCharacters } from '@/store/Characters';

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
const charactersStore = useCharacters()
const active_content = ref<OptionsKeys>(OptionsKeys.ATTRIBUTES)

const setActiveContent = (key: OptionsKeys): void => {
    active_content.value = key
}
watch(() => props.hide, () => {

    if (props.hide) {
        setActiveContent(OptionsKeys.ATTRIBUTES)
    }
})

const setDefaultSort = () => {
    charactersStore.setDefaultFilter()
}

const changedStyle = ref(props.hide)
</script>


<style lang="scss">
.characters-content {
    color: white;
    display: grid;
    grid-template-columns: max-content max-content max-content;
    justify-content: space-between;
    text-shadow:
        0.07em 0 black,
        0 0.07em black,
        -0.07em 0 black;
    width: 60%;
    min-height: 50%;
    margin-top: 10px;
}

.hided {
    justify-content: flex-end;
    margin-top: 85px;
}

@media only screen and (max-width: 1800px) {
    .characters-content {
        width: 95%;
    }
}

@media only screen and (orientation: portrait) {
    .characters-content {
        align-items: center;
        height: 100vh;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .characters-content {
        display: flex;
        flex-direction: column;
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-content {
        height: 100vh;
    }

    .hided {
        margin-top: 50px
    }
}
</style>

