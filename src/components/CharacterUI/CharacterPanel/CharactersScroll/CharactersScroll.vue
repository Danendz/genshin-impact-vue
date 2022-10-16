<template>
    <section :class="['characters-scroll', {'characters-scroll_hide': !characters_state_display}]">
        <div class="characters-scroll__container">
            <ScrollCharacters />
        </div>
        <button @click="closeCharacters"
            :class="['characters-scroll__close', {'characters-scroll__close_hide': !characters_state_display}]"> >
        </button>
    </section>
</template>

<script setup lang="ts">
//components
import ScrollCharacters from './ScrollCharacters.vue';

//vue
import { ref } from 'vue';

//mobile scroll close button
const characters_state_display = ref(false)
const closeCharacters = (): void => {
    characters_state_display.value = !characters_state_display.value
}

</script>

<style lang="scss">
@import '@/assets/Styles/placeholder_animation';
@import '@/assets/Styles/characters_panel';

.characters-scroll {
    position: relative;
    z-index: 99;
    min-width: 25%;
    max-width: 60%;

    &__container {
        position: relative;
    }

    &__close {
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
    .characters-scroll {
        transition: .3s;
        transform: translateX(0);
        position: absolute;

        top: 40px;
        min-width: 45px;

        &__container {
            height: calc(100vh - $infoHeight);
        }

        &__close {
            display: block;
            transform: rotate(180deg);

            &_hide {

                transform: rotate(0deg);
            }
        }

        &_hide {
            transform: translateX(-100%);
        }
    }
}
</style>