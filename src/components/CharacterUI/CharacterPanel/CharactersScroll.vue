<template>
    <section :class="['characters-scroll-container', {'hide-characters-scroll': !characters_state_display}]">
        <section ref="characters_scroll" class="characters">
            <figure @mouseup="handleMouseup(index)" @mousemove="handleMousemove" @mousedown="handleMousedown"
                :class="['char-icon', {'active-character': store.currentCharacterIndex === index}]"
                v-for="(character, index) in props.characters" :key="index">

                <img v-lazy="{
                    src: CharacterHelper.getCharacterImage(character.name_key, CharacterImage.ICON_SIDE),
                    loading: CharacterHelper.getPlaceholderIcon(CharacterImage.ICON_SIDE)
                }" @mousedown="(e: MouseEvent) => e.preventDefault()"
                    :class="[{'active-character-img': store.currentCharacterIndex === index}]"
                    :alt="`${character.name}`" />
            </figure>
        </section>
        <button @click="closeCharacters"
            :class="['close-character-scroll', {'close-character-scroll-hidden': !characters_state_display}]"> >
        </button>
    </section>
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
import { useCurrentCharacter } from '@/store/currentCharacter';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>();
const store = useCurrentCharacter()

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)
onMounted(() => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value)
    }
    let heightWithGap;
    if (characters_scroll.value) {
        if (screen.availWidth <= 915) {
            heightWithGap = 65
            characters_scroll.value.scrollTop += heightWithGap * store.currentCharacterIndex
        } else {
            heightWithGap = 70
            characters_scroll.value.scrollLeft += heightWithGap * store.currentCharacterIndex
        }
    }
})


const characters_state_display = ref(false)
const closeCharacters = (): void => {
    characters_state_display.value = !characters_state_display.value
}

const mousemoved = ref(false);
const clicked = ref(false)

const handleMousedown = () => {
    clicked.value = true
}
const handleMousemove = () => {
    if (clicked.value) {
        mousemoved.value = true
    }
}

const handleMouseup = (index: number): void => {
    if (!mousemoved.value) {
        store.setCurrentCharacter(props.characters[index], index)
    }
    clicked.value = false
    mousemoved.value = false
}
</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';
@import '@/assets/Styles/placeholder_animation';

.characters-scroll-container {
    min-width: 25%;
    max-width: 60%;
    position: relative;
    z-index: 99;

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
                user-drag: none;
                user-select: none;
                -moz-user-select: none;
                -webkit-user-drag: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                width: auto;
                height: 100%;
                border-bottom-left-radius: 35%;
                border-bottom-right-radius: 50%;
                transition: .3s;
            }

            .active-character-img {
                transform: translateX(5px) scale(1.15) translateY(-3px);
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