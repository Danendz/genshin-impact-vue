<template>
    <footer class="characters-footer">
        <section class="footer-buttons">
            <button @click="toggleAllCharacters"><img alt='toggle characters' src='@/assets/Icons/menu.webp' /></button>
        </section>
    </footer>
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

.characters-footer {
    bottom: 12px;
    position: absolute;
    display: flex;
    justify-content: center;
    margin-left: 5px;
    width: fit-content;
    border-radius: 5px;
    padding: 5px;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.363);

    .footer-buttons{
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
    .characters-footer{
        display: none;

    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-footer{
        .footer-buttons {
            width: 95%;
        }
    }
}
</style>