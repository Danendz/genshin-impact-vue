<template>
    <div ref="characters_scroll" class="characters">
        <div @click="emit('set-active-character', index)"
            :class="['char-icon', {'active-character': activeCharacterId === index}]"
            v-for="(character, index) in props.characters" :key="index">

            <img :alt="`${index}`" :src="CharacterHelper.getCharacterSideImage(character.name)" />
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

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters {
    display: flex;
    gap: 15px;
    min-width: 25%;
    max-width: 60%;
    overflow-x: scroll;
    overflow-y: hidden;
    transition: .5s;
    user-select: none;
    position: relative;
    padding: 5px 0;

    .char-icon {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border-radius: 50%;
        min-width: 55px;
        min-height: 55px;
        transition: .3s;
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

@media only screen and (max-width: 915px) {
    .characters {
        position: absolute;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: scroll;
        min-width: fit-content;
        height: calc(100vh - $infoHeight);
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
}
</style>