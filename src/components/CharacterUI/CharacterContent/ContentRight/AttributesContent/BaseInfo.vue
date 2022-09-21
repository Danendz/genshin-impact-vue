<template>
    <div class="base-info">
        <h1 class="name">{{props.currentCharacter.name}} <p><span class="rarity"
                    v-for="rarity in props.currentCharacter.rarity" :key="rarity">*</span></p>
        </h1>
        <p class="base-lvl">Level 90 / <span class="max-lvl">90</span></p>
        <progress class="lvl-progress" value="100" max="100" />
    </div>
</template>

<script setup lang="ts">
import { Character } from '@/Interfaces/CharacterInterface';

interface Props {
    currentCharacter: Character
}

const props = defineProps<Props>();
</script>

<style lang="scss">
.base-info {
    .name {
        display: flex;
        flex-direction: column;
        font-size: 30px;
        font-weight: bold;
    }

    .base-lvl {
        font-size: 22px;

        .max-lvl {
            color: rgb(185, 185, 185);
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .base-info {
            .name {
                font-size: 20px;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .base-lvl {
                font-size: 16px;
            }
        }
    }
}
</style>