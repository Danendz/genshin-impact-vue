<template>
    <section class="characters-scroll">
        <div class="characters-scroll__container">
            <ScrollCharacters />
        </div>
    </section>
</template>

<script setup lang="ts">
//components
import ScrollCharacters from './ScrollCharacters.vue';
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

}


@media only screen and (max-width: 915px) {
    .characters-scroll {
        transition: .3s;
        transform: translateX(0);
        position: absolute;
        left: 5px;
        top: 45px;
        background-color: $transparency;
        backdrop-filter: blur(3px);
        border-radius: 12px;

        min-width: 45px;

        &__container {

            height: calc(86vh - $infoHeight);
        }
    }
}

@media only screen and (max-width:915px) and (orientation: portrait) {
    .characters-scroll {
        top: 23vh;
        left: 0px;
        border-radius: 0;
        border-bottom-right-radius: 12px;
        border-top-right-radius: 12px;

        &__container {
            height: 53vh;
        }
    }
}
</style>