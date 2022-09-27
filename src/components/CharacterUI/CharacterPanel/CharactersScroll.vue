<template>
    <section :class="['characters-scroll-container', {'hide-characters-scroll': !characters_state_display}]">
        <section ref="characters_scroll" class="characters">
            <PreventClickEvent @click-function="changeCharacter"
                :class="['char-icon', {'active-character': store.currentCharacterIndex === index}]" :index="index"
                v-for="(character, index) in props.characters" :key="index">
                <LazyImg :options="{
                src: CharacterHelper.getCharacterImage(character.name_key, CharacterImage.ICON_SIDE),
                loading: CharacterHelper.getPlaceholderIcon(CharacterImage.ICON_SIDE),
                alt: character.name
                }" :class="[{'active-character-img': store.currentCharacterIndex === index}]" />

            </PreventClickEvent>
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
import CharacterHelper from '@/helpers/CharacterHelper';

//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//components
import PreventClickEvent from '@/components/ComponentHelpers/PreventClickEvent.vue';
import LazyImg from '@/components/UI/Lazy-Img.vue';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//vue
import { onMounted, ref, watch, nextTick } from 'vue';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>();
const store = useCurrentCharacter()
const hideLayout = useHideMainCharactersLayout()

//creating horizontal drag scroll
const characters_scroll = ref<null | HTMLDivElement>(null)
let scrollTypes: 'scrollLeft' | 'scrollTop' = 'scrollLeft'
let heightWithGap = 70;
const createScroll = () => {
    if (characters_scroll.value) {
        useCreateScroll(characters_scroll.value, 'horizontal')
        if (screen.availWidth <= 915) {
            heightWithGap = 65
            scrollTypes = 'scrollTop'
        }
    }
}
onMounted(() => {
    createScroll()
})

watch(() => hideLayout.hide, () => {
    nextTick(() => {
        if (characters_scroll.value && !hideLayout.hide) {
            characters_scroll.value[scrollTypes] += heightWithGap * store.currentCharacterIndex
        }
    })
})

//mobile scroll close button
const characters_state_display = ref(false)
const closeCharacters = (): void => {
    characters_state_display.value = !characters_state_display.value
}

const changeCharacter = (index: number): void => {
    store.setCurrentCharacter(props.characters[index], index)
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