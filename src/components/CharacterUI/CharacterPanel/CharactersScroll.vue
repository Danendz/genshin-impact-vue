<template>
    <div :class="['characters-scroll-container', {'hide-characters-scroll': !characters_state_display}]">
        <div ref="characters_scroll" class="characters">
            <div @click="emit('set-active-character', index)"
                :class="['char-icon', {'active-character': activeCharacterId === index}]"
                v-for="(character, index) in props.characters" :key="index">

                <img :alt="`${index}`"
                    :src="CharacterHelper.getCharacterImage(character.name_key, CharacterImage.ICON_SIDE)" />
            </div>
        </div>
        <button @click="closeCharacters"
            :class="['close-character-scroll', {'close-character-scroll-hidden': !characters_state_display}]"> >
        </button>
    </div>
</template>

<script setup lang="ts">
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper'

//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//vue
import { onMounted, ref } from 'vue';

interface Props {
    activeCharacterId: number,
    characters: Character[]
}

const emit = defineEmits<{
    (event: 'set-active-character', number: number): void
}>()

const props = defineProps<Props>();

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)
onMounted(() => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value)
    }
})

const characters_state_display = ref(false)
const closeCharacters = () => {
    characters_state_display.value = !characters_state_display.value
}

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-scroll-container {
    min-width: 25%;
    max-width: 60%;
    position: relative;

    .characters {
        display: flex;
        gap: 15px;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        transition: .5s;
        user-select: none;
        padding: 5px 0;

        .char-icon {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: flex-end;
            border-radius: 50%;
            min-width: 55px;
            min-height: 55px;
            transition: .3s;
            border: 3px solid #6c9992;
            cursor: pointer;

            img {
                position: absolute;
                transform: translateX(5px);
                user-select: none;
                width: auto;
                height: 100%;
                border-bottom-left-radius: 35%;
                border-bottom-right-radius: 50%;
                -webkit-user-drag: none;
            }
        }

        .active-character,
        .char-icon:hover {
            background-color: #5bb8d9;
            border: 3px solid #7ec8b9;
        }

    }

    .close-character-scroll {
        display: none;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 0;
        top: calc(50% - 40px);
        right: -30px;
        font-weight: bold;
        font-size: 20px;
        color: white;
        background-color: rgba(0, 0, 0, 0.219);
        cursor: pointer;
        transition: .3s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.308);
        }
    }
}


@media only screen and (max-width: 915px) {
    .characters-scroll-container {
        position: absolute;
        top: 40px;
        min-width: 45px;
        transition: .3s;
        transform: translateX(0);

        .characters {
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: scroll;
            height: calc(100vh - $infoHeight);
            gap: 10px;
            padding: 0px 5px;
            background-color: $transparency;
        }

        .close-character-scroll {

            display: block;
            transform: rotate(180deg);
        }

        .close-character-scroll-hidden {
            transform: rotate(0deg);
        }
    }

    .hide-characters-scroll {
        transform: translateX(-100%);
    }

}
</style>