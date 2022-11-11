<template>
    <section class="attributes-content" v-if="store.currentCharacter">
        <BaseInfo :current-character="store.currentCharacter" />
        <StatsBar />
        <button aria-label="character details toggle" @click="() => setActiveDetails()"
            class="details-btn">Details</button>
        <FriendshipAndDescription />
        <footer class="footer-buttons">
            <button aria-label="dressing room">
                <img alt="dressing_room" :src="CharacterHelper.getGenshinSiteIcons('stats-icons/dressing_room')" />
                <span>Dressing Room</span>
            </button>
        </footer>
    </section>
    <ModalWindow @close-modal="setActiveDetails" :active_state="active_details" :modalStyle="'details'">
        <Suspense v-if="detailsLoaded">
            <template #default>
                <DetailsInfo />
            </template>
            <template #fallback>
                <LoaderSpinner />
            </template>
        </Suspense>
    </ModalWindow>
</template>

<script setup lang="ts">
//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

//components
import BaseInfo from './BaseInfo.vue';
import StatsBar from './StatsBar.vue';
import FriendshipAndDescription from './FriendshipAndDescription.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue'

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//vue
import { ref, defineAsyncComponent } from 'vue';
import LoaderSpinner from '@/components/UI/LoaderSpinner.vue';

const detailsLoaded = ref(false)
const DetailsInfo = defineAsyncComponent(() => import('./DetailsInfo.vue'))

const store = useCurrentCharacter()

const active_details = ref<boolean>(false)

const setActiveDetails = (value?: boolean) => {
    active_details.value = value ?? !active_details.value
    if (!detailsLoaded.value) {
        detailsLoaded.value = true
    }
}

</script>

<style lang="scss">
@import '@/assets/Styles/colors';

.attributes-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.06);

    backdrop-filter: blur(3px);

    .footer-buttons {
        margin-top: auto;

        button {
            display: flex;
            cursor: pointer;
            align-items: center;
            padding: 7px 5px;
            background-color: $main_color;
            border: 0;
            border-radius: 20px;
            width: 100%;
            transition: .3s;

            &:hover {
                transform: translateY(-2px);
            }

            &:active {
                transform: translateY(-1px);
            }
        }

        img {
            width: 20px;
            height: auto;
        }

        span {
            width: 100%;
        }
    }

    .lvl-progress,
    .friendship-progress {
        border-radius: 7px;
        width: 100%;
        height: 3px;
        margin-top: 2px;
        display: block;
    }

    .lvl-progress::-webkit-progress-bar,
    .friendship-progress::-webkit-progress-bar {
        background-color: rgba(0, 0, 0, 0.486);
        border-radius: 10px;
    }

    .lvl-progress::-webkit-progress-value {
        background-color: #3ed2ff;
        box-shadow: 0px 0px 8px #3ed2ff;
        border-radius: 10px;
    }

    .friendship-progress::-webkit-progress-value {
        background-color: #fc8ef3;
        box-shadow: 0px 0px 8px #fc8ef3;
        border-radius: 10px;
    }

    .details-btn {
        border: 0;
        padding: 8px;
        color: white;
        font-size: 16px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.192);
        transition: .3s;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.192);
        }
    }
}

@media only screen and (orientation: portrait) {
    .attributes-content {
        background-color: rgba(0, 0, 0, 0.384);
        backdrop-filter: blur(2px);
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        gap: 5px;
        background-color: transparent;
        backdrop-filter: blur(0px);
        padding: 0;

        .details-btn {
            font-size: 14px;
            padding: 2px;
        }

        .footer-buttons {
            margin-top: 3px;

            button {
                padding: 3px 5px;
            }

            img {
                width: 13px;
            }

            span {
                font-size: 11px;
                font-weight: bold;
                width: 100%;
            }
        }
    }
}
</style>