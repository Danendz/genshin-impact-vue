<template>
    <div class="characters-panel">
        <div class="panel-content">
            <CharactersInfo />
            <CharactersScroll :characters="props.characters" :active-character-id="props.activeCharacterId"
                @set-active-character="props.setActiveCharacter" />
            <div class="close">
                <button @click="router.go(-1)">X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//components
import CharactersInfo from './CharactersInfo.vue';
import CharactersScroll from './CharactersScroll.vue';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';
import { useRouter } from 'vue-router';


const router = useRouter()

interface Props {
    characters: Character[],
    activeCharacterId: number,
    setActiveCharacter: (num: number) => void
}

const props = defineProps<Props>();

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-panel {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: $transparency;

    .panel-content {
        width: 70%;
        display: flex;
        align-items: center;
    }

    .close {
        display: flex;
        justify-content: flex-end;
        margin-left: auto;

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
</style>