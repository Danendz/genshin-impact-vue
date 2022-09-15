<template>
    <div class="characters-panel">
        <div class="panel-content">
            <div class="info">
                <img alt="vision"
                    src="https://static.wikia.nocookie.net/gensin-impact/images/1/1d/Vision_Mondstadt_Cryo.png/" />
                <p class="visionAndName">Cryo/ Ganyu</p>
            </div>
            <div ref="characters_scroll" class="characters">
                <div @click="emit('set-active-character', index)"
                    :class="['char-icon', {'active-character': activeCharacter === index}]"
                    v-for="(character, index) in props.characters" :key="index">
                    <img :alt="`${index}`" :src="CharacterHelper.getCharacterSideImage(character.name)" />
                </div>
            </div>
            <div class="close">
                <button>X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper'

//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//vue
import { ref, watch } from 'vue';

interface Props {
    characters: Character[],
    activeCharacter: number
}

const props = defineProps<Props>()
    
const emit = defineEmits<{
    (event: 'set-active-character', number: number): void
}>()

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)

watch(characters_scroll, () => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value)
    }
})

</script>

<style lang="scss">
$transparency: rgba(0, 0, 0, 0.11);

.characters-panel {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: $transparency;

    .panel-content {
        width: 70%;
        display: flex;
        flex-shrink: 1;
        align-items: center;
        justify-content: space-between;

        .info {
            display: flex;
            align-items: center;

            img {
                width: 70px;
            }
        }

        .characters {
            display: flex;
            gap: 15px;
            min-width: 25%;
            max-width: 60%;
            overflow-x: scroll;
            overflow-y: hidden;
            transition: .5s;
            user-select: none;
            padding: 5px 0;

            .char-icon {
                display: flex;
                justify-content: center;
                align-items: flex-end;
                border-radius: 50%;
                min-width: 55px;
                min-height: 55px;
                transition: .3s;
                background-color: #20466a;
                border: 3px solid #6c9992;
                cursor: pointer;

                img {
                    transform: translateX(5px);
                    user-select: none;
                    width: 40px;
                    height: 45px;
                    border-radius: 50%;
                    -webkit-user-drag: none;
                }
            }

            .active-character,
            .char-icon:hover {
                background-color: #5bb8d9;
                border: 3px solid #7ec8b9;
            }
        }

        .close {
            display: flex;
            justify-content: flex-end;

            button {
                cursor: pointer;
                transition: .2s;
                width: 45px;
                height: 45px;
                font-size: 20px;
                border-radius: 50%;
                border: 5px solid #b3b3b35d;
                background-color: #e0dada;
                margin-right: 5px;

                &:hover {
                    transform: scale(1.1)
                }
            }
        }
    }
}

@media only screen and (max-width: 1366px) {
    .characters-panel {
        .panel-content {
            width: 100%;
        }
    }
}

@media only screen and (max-width: 915px) {
    .characters-panel {
        .panel-content {
            width: 100%;
            position: relative;

            .info {
                img {
                    width: 40px;
                }
            }

            .characters {
                position: absolute;
                flex-direction: column;
                overflow-x: hidden;
                overflow-y: scroll;
                min-width: fit-content;
                height: calc(95vh - 40px);
                top: 40px;
                padding: 5px;
                gap: 10px;
                background-color: $transparency;

                .char-icon {
                    img {
                        width: 45px;
                    }
                }
            }

            .close {
                button {
                    width: 30px;
                    height: 30px;
                    font-size: 15px;
                }
            }
        }
    }
}

@media only screen and (max-height: 500px) {
    .characters-panel {
        .panel-content {
            .characters {
                height: calc(93vh - 40px);
            }
        }
    }

}
</style>