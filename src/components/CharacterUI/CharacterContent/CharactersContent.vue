<template>
    <section :class="['characters-content', { 'characters-content_hided': changedStyle }]">
        <Transition @after-leave="changedStyle = true" @before-enter="changedStyle = false"
            @after-enter="setDefaultSort" name="fade-right" appear>
            <ContentOptions v-show="!hideLayout.hide" :options-list="options_list" />
        </Transition>
        <Transition name="fade-right">
            <section v-if="!hideLayout.hide" class="centerContent">

            </section>
        </Transition>
        <Transition name="fade">
            <ContentRight v-show="showCharactersSelectionList.show || !hideLayout.hide" :options_list="options_list" />
        </Transition>
    </section>
</template>

<script setup lang="ts">
//components
import ContentOptions from './ContentOptions.vue';
import ContentRight from './ContentRight/ContentRight.vue';

//stores
import { useCharacters } from '@/store/Characters/Characters';
import { useActiveCategory } from '@/store/ActiveCategory'
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';

//enums
import { OptionsKeys } from '@/Enums/OptionsKeys';

//vue
import { ref, watch } from 'vue'

const options_list = {
    'attributes': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'weapons': () => import('./ContentRight/WeaponsContent.vue'),
    'artifacts': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'constellation': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'talents': () => import('./ContentRight/AttributesContent/AttributesContent.vue'),
    'profile': () => import('./ContentRight/AttributesContent/AttributesContent.vue')
}
const charactersStore = useCharacters()
const activeCategory = useActiveCategory()
const hideLayout = useHideMainCharactersLayout()

const showCharactersSelectionList = useShowCharactersSelectionList()

watch(() => hideLayout.hide, () => {
    if (hideLayout.hide) {
        activeCategory.setActiveCategory(OptionsKeys.ATTRIBUTES)
    }
})

const setDefaultSort = () => {
    charactersStore.setDefaultFilter()
}

const changedStyle = ref(hideLayout.hide)
</script>

<style lang="scss">
.characters-content {
    color: white;
    display: grid;
    grid-template-columns: max-content max-content max-content;
    justify-content: space-between;
    text-shadow:
        0.07em 0 rgba(0, 0, 0, 0.315),
        0 0.07em rgba(0, 0, 0, 0.219),
        -0.07em 0 rgba(0, 0, 0, 0.164);
    width: 100%;
    max-width: 1550px;
    height: fit-content;
    margin-top: 10px;

    &_hided {
        justify-content: flex-end;
        margin-top: 85px;
    }
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

        &_hided {
            margin-top: 50px
        }
    }
}
</style>

