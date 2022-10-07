<template>
    <Transition name="fade-up" appear>
        <header v-show="!hideLayout.hide" class="characters-panel">
            <section class="characters-panel__content">
                <CharactersInfo />
                <CharactersScroll />
                <section class="characters-panel__close">
                    <button @click="router.go(-1)">X</button>
                </section>
            </section>
        </header>
    </Transition>
</template>

<script setup lang="ts">
//components
import CharactersInfo from './CharactersInfo.vue';
import CharactersScroll from './CharactersScroll/CharactersScroll.vue';

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//interfaces
import { useRouter } from 'vue-router';

const router = useRouter()

const hideLayout = useHideMainCharactersLayout()
</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-panel {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    z-index: 2;
    background-color: $transparency;

    &__content {
        width: 70%;
        display: flex;
        align-items: center;

        .characters-panel__close {
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
}

@media only screen and (max-width: 1366px) {
    .characters-panel {
        &__content {
            width: 100%;
        }
    }
}

@media only screen and (max-width: 915px) {
    .characters-panel {
        height: 40px;

        &__content {
            width: 100%;
            position: relative;

            .characters-panel__close {
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