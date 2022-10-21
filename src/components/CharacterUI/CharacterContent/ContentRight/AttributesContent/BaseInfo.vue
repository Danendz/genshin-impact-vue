<template>
    <header class="base-info">
        <Transition name="name-up" appear>
            <h1 :key="props.currentCharacter.name" class="name">{{props.currentCharacter.name}}</h1>
        </Transition>
        <p>
            <TransitionGroup name="name-up" appear>
                <Icon class="rarity" v-for="rarity, index in props.currentCharacter.rarity" :key="rarity"
                    icon="mdi:star-four-points" :data-index="index" />
            </TransitionGroup>
        </p>
        <p class="base-lvl">Level 90 / <span class="max-lvl">90</span></p>
        <progress class="lvl-progress" value="100" max="100" />
    </header>
</template>

<script setup lang="ts">
//interface
import { Character } from '@/Interfaces/CharacterInterface';

//iconify
import { Icon } from '@iconify/vue'

interface Props {
    currentCharacter: Character
}

const props = defineProps<Props>();

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