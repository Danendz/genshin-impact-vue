<template>
    <div class="attributes-content" v-if="store.currentCharacter">
        <BaseInfo :current-character="store.currentCharacter" />
        <StatsBar />
        <button @click="setActiveDetails" class="details-btn">Details</button>
        <FriendshipAndDescription :current-character="store.currentCharacter" />
        <div class="rightButtons">
            <button><img /><span>Dressing Room</span></button>
        </div>
    </div>
    <ModalWindow @close-modal="setActiveDetails" :active_state="active_details" :modalStyle="'details'">
        <DetailsInfo />
    </ModalWindow>
</template>

<script setup lang="ts">
//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

//components
import BaseInfo from './BaseInfo.vue';
import StatsBar from './StatsBar.vue';
import FriendshipAndDescription from './FriendshipAndDescription.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue';
import DetailsInfo from './DetailsInfo.vue';

//vue
import { ref } from 'vue';

const store = useCurrentCharacter()

const active_details = ref<boolean>(false)

const setActiveDetails = () => {
    active_details.value = !active_details.value
}

</script>

<style lang="scss">
.attributes-content {
    display: flex;
    flex-direction: column;
    gap: 10px;


    .lvl-progress,
    .friendship-progress {
        border-radius: 7px;
        width: 100%;
        height: 5px;
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
        border-radius: 10px;
    }

    .friendship-progress::-webkit-progress-value {
        background-color: #fc8ef3;
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


@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .details-btn {
            font-size: 15px;
            padding: 2px;
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        gap: 5px;
    }
}
</style>