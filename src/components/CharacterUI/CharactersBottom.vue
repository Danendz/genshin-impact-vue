<template>
    <Transition name="fade-down" appear>
        <footer v-show="!showCharactersSelectionList.show" class="characters-footer">
            <section class="characters-footer__buttons">
                <button @click="toggleSelectionList"><img title="Toggle Characters" alt='toggle characters'
                        src='@/assets/Icons/menu.webp' /></button>
                <button @click="toggleVideo"><img title="Toggle Character Demo" alt='toggle video'
                        src='@/assets/Icons/play-button.webp' /></button>

                <button @click="toggleLayout"><img title="Toggle Character Demo" alt='toggle video'
                        src='@/assets/Icons/hide.webp' /></button>
            </section>
        </footer>
    </Transition>
</template>

<script setup lang="ts">
//composables
import useToggleCharacterSelelectionList from '@/Composables/useToggleSelectionList';

//stores
import { useShowDemoBGVideo } from '@/store/showDemoBGVideo';
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

const { toggleSelectionList } = useToggleCharacterSelelectionList()
const showDemoBGVideo = useShowDemoBGVideo()
const showCharactersSelectionList = useShowCharactersSelectionList()
const hideLayout = useHideMainCharactersLayout()

const toggleVideo = () => {
    showDemoBGVideo.toggleShow()
}

const toggleLayout = () => {
    if (showCharactersSelectionList.show) {
        toggleSelectionList()
    } else {
        hideLayout.setHide()
    }
}

</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-footer {
    bottom: 12px;
    position: absolute;
    display: flex;
    left: 20%;
    margin-left: 5px;
    width: fit-content;
    border-radius: 5px;
    padding: 5px;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.363);

    &__buttons {
        width: 100%;
        margin: 0 10px;
        display: flex;
        
        gap: 10px;

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
    .characters-footer {
        display: none;

    }
}
@media only screen and (max-width: 1800px){
    .characters-footer{
        left: 0;
    }
}
@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-footer {
        &__buttons {
            width: 95%;
            button{
                width: 25px;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 80%;
                }
            }
        }
    }
}
</style>