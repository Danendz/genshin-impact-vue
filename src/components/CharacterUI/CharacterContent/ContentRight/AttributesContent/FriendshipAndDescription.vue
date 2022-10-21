<template>
    <figure class="friendship">
        <img alt="friendship" :src="CharacterHelper.getGenshinSiteIcons('stats-icons/friendship')" />
        <figcaption>Friendship</figcaption>
        <figcaption class="friendship-lvl">8</figcaption>
    </figure>
    <progress class="friendship-progress" value="90" max="100" />
    <GsapTransition :is-appear="true" mode="out-in" :options="descriptionTransition">
        <p v-if="store.currentCharacter" :key="store.currentCharacter.description" class="content-right-description">
            {{store.currentCharacter.description}}
        </p>
    </GsapTransition>
</template>

<script setup lang="ts">
//interfaces
import { useCurrentCharacter } from '@/store/currentCharacter'

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//components
import GsapTransition from '@/components/ComponentHelpers/GsapTransition.vue';


const store = useCurrentCharacter()
const descriptionTransition = {
    beforeEnter: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        duration: 0.3,
    },
    leave: {
        opacity: 0,
        duration: 0.3,
    }
}



</script>

<style lang="scss">
.attributes-content {
    .friendship {
        display: flex;
        font-size: 17px;
        align-items: center;

        img {
            width: auto;
            height: 12px;
            margin-right: 5px;
        }

        .friendship-lvl {
            margin-left: auto;
        }
    }

    .content-right-description {
        padding: 0px 5px;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100px;
        font-size: 17px;
        word-break: break-word;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .attributes-content {
        .content-right-description {
            font-size: 13px;
            max-height: 100px;
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .friendship {
            font-size: 13px;
        }

        .content-right-description {
            font-size: 13px;
            max-height: 60px;
        }
    }
}
</style>