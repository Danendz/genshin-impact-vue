<template>
    <div class="characters-bottom">
        <div class="footer">
            <button @click="toggleAllCharacters"><img alt='toggle characters' src='@/assets/Icons/menu.webp' /></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

const hideLayout = useHideMainCharactersLayout();

const toggleAllCharacters = () => {
    hideLayout.setHide();
}
</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-bottom {
    bottom: 10px;
    position: absolute;
    display: flex;
    justify-content: center;
    margin-left: 5px;
    width: fit-content;
    border-radius: 5px;
    padding: 5px;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.363);

    .footer {
        width: 100%;
        margin: 0 10px;

        button {

            width: 30px;
            height: 30px;
            padding: 2px;
            border: 0;
            background-color: white;
            cursor: pointer;
            border-radius: 5px;
            transition: .3s;

            img {
                width: 100%;
            }

            &:hover {
                transform: scale(1.05);
            }
        }
    }
}

@media only screen and (orientation: portrait) {
    .characters-bottom {
        display: none;

    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-bottom {
        .footer {
            width: 95%;

            button {
                width: 25px;
                height: 25px;
            }
        }
    }
}
</style>