<template>
    <header class="base-info">
        <GsapTransition :is-appear="true" :options="nameTransition">
            <h1 :key="props.currentCharacter.name" class="name">{{props.currentCharacter.name}}</h1>
        </GsapTransition>
        <p>
            <GsapTransition :is-appear="true" :is-group="true" :options="rarityTransition">
                <Icon class="rarity" v-for="rarity, index in props.currentCharacter.rarity" :key="rarity"
                    icon="mdi:star-four-points" :data-index="index" />
            </GsapTransition>
        </p>
        <p class="base-lvl">Level 90 / <span class="max-lvl">90</span></p>
        <progress class="lvl-progress" value="100" max="100" />
    </header>
</template>

<script setup lang="ts">
//interface
import { Character } from '@/Interfaces/CharacterInterface';
import { IOptions } from '@/Interfaces/GsapTransitionOptions';

//iconify
import { Icon } from '@iconify/vue'

//components
import GsapTransition from '@/components/ComponentHelpers/GsapTransition.vue'

interface Props {
    currentCharacter: Character
}

const props = defineProps<Props>();
const nameTransition: IOptions = {
    beforeEnter: {
        opacity: 0,
        transform: 'translateY(-50%)',
        position: 'relative'
    },
    enter: {
        opacity: 1,
        duration: 0.5,
        transform: 'translateY(0)'
    },
    leave: {
        opacity: 0,
        duration: 0.5,
        position: 'absolute',
        transform: 'translateY(50%)'
    }
}

const rarityTransition: IOptions = {
    beforeEnter: {
        opacity: 0,
        transform: 'translateY(50%)'
    },
    enter: {
        opacity: 1,
        duration: 0.3,
        transform: 'translateY(0)'
    },
    leave: {
        opacity: 0,
        duration: 0.3,
        transform: 'translateY(-30%)'
    }
}

</script>

<style lang="scss">
.base-info {
    .name {
        font-size: 28px;
        font-weight: bold;
    }

    .base-lvl {
        font-size: 21px;

        .max-lvl {
            color: rgb(185, 185, 185);
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .base-info {
            .name {
                font-size: 16px;

            }

            .rarity {
                font-size: 12px;
            }

            .base-lvl {
                font-size: 13px;
            }
        }
    }
}
</style>