<template>
    <section class="option" @click="setFilter">
        <span class="option-input"><span
                :class="['option-input-dot', {'checked': optionState}, {'fix-dot': index % 2 !== 0}]" /></span>
        <p>{{option}}</p>
    </section>
</template>

<script setup lang="ts">
//components
import { useCharacters } from '@/store/Characters';

interface Props {
    optionKey: keyof typeof charactersFilters
    option: string,
    optionState: boolean,
    index: number
}

const props = defineProps<Props>()
const characters = useCharacters()

const charactersFilters = characters.sortAndFilter.filter

const setFilter = () => {
    charactersFilters[props.optionKey][props.option] = !charactersFilters[props.optionKey][props.option]
}
</script>

<style lang="scss">
.options-container {
    .option {
        display: flex;
        padding: 0 10px;
        align-items: center;
        cursor: pointer;
        gap: 10px;
        height: 50px;
        font-size: 20px;
        font-weight: bold;
        background-color: #25313f;
        border: 1px solid rgba(255, 255, 255, 0.247);
        border-radius: 2px;
        transition: .2s;


        &:hover {
            background-color: rgba(255, 255, 255, 0.938);
            color: black;
            border: 1px solid transparent;
        }

        &:hover .option-input{
            border-color: black;
        }
        &:hover .option-input .option-input-dot.checked {
            background-color: black;
        }
        .option-input {
            width: 20px;
            height: 20px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.247);
            border-radius: 50%;
            transition: .2s;

            .option-input-dot {
                width: 70%;
                height: 70%;
                transition: .2s;
                background-color: transparent;
                border-radius: 50%;

                &.checked {
                    background-color: rgba(255, 255, 255, 0.247);
                }

                &.fix-dot {
                    margin-left: 1px;
                }
            }
        }
    }
}


@media only screen and (max-width: 915px) and (orientation: landscape) {
    .options-container {
        .option {
            font-size: 12px;
            height: 30px;
            gap: 5px;

            .option-input {
                width: 10px;
                height: 10px;

                .option-input-dot {
                    &.fix-dot {
                        margin-left: 1%;
                    }
                }
            }


        }

    }
}
</style>