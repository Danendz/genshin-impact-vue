<template>
    <figure class="friendship">
        <img alt="friendship" :src="CharacterHelper.getGenshinSiteIcons('stats-icons/friendship')" />
        <figcaption>Friendship</figcaption>
        <figcaption class="friendship-lvl">8</figcaption>
    </figure>
    <progress class="friendship-progress" value="90" max="100" />
    <Transition name="fade" mode="out-in" appear>
        <p v-if="store.currentCharacter" :key="store.currentCharacter.description" class="content-right-description">
            {{ store.currentCharacter.description }}
        </p>
    </Transition>
</template>

<script setup lang="ts">
//interfaces
import { useCurrentCharacter } from '@/store/currentCharacter'

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

const store = useCurrentCharacter()
</script>

<style lang="scss">
.attributes-content {
    .friendship {
        display: flex;
        font-size: 15px;
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
        font-size: 14px;
        word-break: break-word;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .attributes-content {
        .content-right-description {
            font-size: 10px;
            max-height: 100px;
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .friendship {
            font-size: 10px;
        }

        .content-right-description {
            font-size: 10px;
            max-height: 60px;
        }
    }
}
</style>