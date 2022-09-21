<template>
    <aside class="options">
        <ul>
            <li v-for="value, key, index in optionsList" :key="index"
                :class="[{'active-option': props.active_content === key}]" @click="emit('setActiveContent',key)">
                {{key}}
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">import { OptionsKeys } from '@/Enums/OptionsKeys';

interface Props {
    active_content: string
    optionsList: {
        [Property in OptionsKeys]: () => Promise<unknown>
    }
}
const props = defineProps<Props>();

const emit = defineEmits<{
    (event: 'setActiveContent', key: OptionsKeys): void
}>()


</script>

<style lang="scss">
.options {
    ul {
        list-style: none;
        font-size: 30px;
        font-weight: bold;

        li {
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
        }

        .active-option {
            color: white;

            &::before {
                content: '';
                border: 1px solid rgb(163, 163, 163);
                background: linear-gradient(45deg, transparent 50%, white 50%);
            }
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .options {
        ul {
            font-size: 20px;
        }
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .options {
        order: 2;

        ul {
            font-size: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;

            li {
                padding-bottom: 5px;
            }
        }
    }
}
</style>