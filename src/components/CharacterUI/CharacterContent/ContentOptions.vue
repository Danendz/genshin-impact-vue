<template>
    <aside class="content-options">
        <ul>
            <ListItemRhombus v-for="_, key, index in props.optionsList" :key="index"
                :is-active="activeCategory.active_category === key" :text="t(`characters.sections.${key}`)"
                @click="activeCategory.setActiveCategory(key)" />
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { OptionsKeys } from '@/Enums/OptionsKeys';
import { useActiveCategory } from '@/store/ActiveCategory';

//composables
import { useGetTranslator } from '@/Composables/useGetTranslator';

//components
import ListItemRhombus from '@/components/UI/list/ListItemRhombus.vue';

interface Props {
    optionsList: {
        [Property in OptionsKeys]: () => Promise<unknown>
    }
}
const props = defineProps<Props>();
const activeCategory = useActiveCategory()
const { t } = useGetTranslator()
</script>

<style lang="scss">
.content-options {
    ul {
        list-style: none;
        font-size: 27px;
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .content-options {
        margin-left: 60px;

        ul {
            font-size: 15px;

        }
    }
}

@media only screen and (min-width: 700px) and (orientation: portrait) {
    .content-options {
        margin-left: 60px;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .content-options {
        order: 2;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.507);

        margin-bottom: 6%;
        border-radius: 10px;
        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 0px;
        }

        ul {
            font-size: 15px;
            display: flex;
            gap: 5px;
            padding: 5px;
            width: fit-content;

            p {
                white-space: nowrap;
            }
        }
    }
}
</style>