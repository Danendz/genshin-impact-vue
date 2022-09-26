<template>
    <header class="characters-panel">
        <section class="panel-content">
            <CharactersInfo />
            <CharactersScroll :characters="props.characters" />
            <section class="close">
                <button @click="router.go(-1)">X</button>
            </section>
        </section>
    </header>
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
    characters: Character[]
}

const props = defineProps<Props>();

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-panel {
    width: 100%;
    height: 75px;
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
        height: 40px;

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