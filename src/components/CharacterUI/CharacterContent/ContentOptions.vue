<template>
    <aside class="content-options">
        <ul>
            <li v-for="_, key, index in props.optionsList" :key="index"
                :class="['content-options__option', { 'content-options__option_active': activeCategory.active_category === key }]"
                @click="activeCategory.setActiveCategory(key)">
                <p>{{ t(`characters.sections.${key}`) }}
                </p>

            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { OptionsKeys } from '@/Enums/OptionsKeys';
import { useActiveCategory } from '@/store/ActiveCategory';

//composables
import { useGetTranslator } from '@/Composables/useGetTranslator';

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

        .content-options__option {
            display: flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            padding-bottom: 16px;
            color: rgb(212, 212, 212);
            transition: .3s;
            position: relative;

            &::before {
                content: '';
                margin-right: 10px;
                z-index: -1;
                transition: .5s;
                box-sizing: border-box;
                display: block;
                transform: rotate(45deg) scale(var(--ggs, 0.6));
                width: 15px;
                height: 15px;
                border-radius: 2px;
                background-color: rgb(163, 163, 163);
                border: 1px solid rgb(163, 163, 163);
            }

            &::after {
                content: '';
                position: absolute;
                left: 0;
                width: 10px;
                height: 10px;
                box-sizing: border-box;
                display: block;
                width: 15px;
                height: 15px;
                transform: rotate(45deg) scale(var(--ggs, 0.45));
                background: linear-gradient(45deg, transparent 50%, white 50%);
                border-radius: 2px;
                opacity: 0;
            }

            &:hover {
                color: white;
            }

            &_active {
                color: white;

                &::before {
                    background-color: transparent;
                    transform: rotate(45deg) scale(var(--ggs, 0.9));
                }

                &::after {
                    opacity: 1;
                    animation: ActiveOption 1s infinite linear;
                }
            }
        }
    }
}


@keyframes ActiveOption {
    0% {
        translate: 0;
    }

    50% {
        translate: 4px;
    }

    100% {
        translate: 0;
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