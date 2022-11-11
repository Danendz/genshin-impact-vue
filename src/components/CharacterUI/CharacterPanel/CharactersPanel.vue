<template>
    <Transition name="fade-up" appear>
        <header v-show="!hideLayout.hide" class="characters-panel">
            <section class="characters-panel__content">
                <CharactersInfo />
                <CharactersScroll />
                <section class="characters-panel__close">
                    <CloseButton />
                </section>
            </section>
        </header>
    </Transition>
</template>

<script setup lang="ts">
//components
import CharactersInfo from './CharactersInfo.vue';
import CharactersScroll from './CharactersScroll/CharactersScroll.vue';
import CloseButton from '@/components/UI/CloseButton.vue';

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

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
    user-select: none;

    &__content {
        width: 100%;
        max-width: 1600px;
        display: flex;
        align-items: center;

        .characters-panel__close {
            display: flex;
            justify-content: flex-end;
            margin-left: auto;
            margin-right: 5px;

        }
    }
}

@media only screen and (max-width: 1800px) {
    .characters-panel {
        &__content {
            width: 95%;
        }
    }
}

@media only screen and (max-width: 915px) {
    .characters-panel {
        height: 40px;

        &__content {
            width: 100%;
            position: relative;
        }
    }
}
</style>