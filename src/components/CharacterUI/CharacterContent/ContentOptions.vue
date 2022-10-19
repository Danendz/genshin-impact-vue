<template>
    <aside class="content-options">
        <ul>
            <li v-for="_, key, index in props.optionsList" :key="index"
                :class="['content-options__option', {'content-options__option_active': activeCategory.active_category === key}]"
                @click="activeCategory.setActiveCategory(key)">
                {{key}}
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { OptionsKeys } from '@/Enums/OptionsKeys';
import { useActiveCategory } from '@/store/ActiveCategory';

interface Props {
    optionsList: {
        [Property in OptionsKeys]: () => Promise<unknown>
    }
}
const props = defineProps<Props>();
const activeCategory = useActiveCategory()

</script>

<style lang="scss">
.content-options {
    ul {
        list-style: none;
        font-size: 30px;
        font-weight: bold;

        .content-options__option {
            display: flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            padding-bottom: 16px;
            color: rgb(212, 212, 212);
            transition: .3s;

            &::before {
                content: '';
                z-index: -1;
                transition: .5s;
                box-sizing: border-box;
                display: block;
                margin-right: 10px;
                transform: rotate(45deg) scale(var(--ggs, 1));
                width: 12px;
                height: 12px;
                border: 6px solid rgb(163, 163, 163);
            }

            &:hover {
                color: white;
            }

            &_active {
                color: white;

                &::before {
                    content: '';
                    border: 1px solid rgb(163, 163, 163);
                    background: linear-gradient(45deg, transparent 50%, white 50%);
                }
            }
        }


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

        ul {
            font-size: 16px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;

            .content-options__option {
                padding-bottom: 5px;
            }
        }
    }
}
</style>