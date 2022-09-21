<template>
    <div class="friendship">
        <img />
        <span>Friendship</span>
        <span class="friendship-lvl">8</span>
    </div>
    <progress class="friendship-progress" value="90" max="100" />
    <p class="content-right-description">
        {{props.currentCharacter.description}}
    </p>
</template>

<script setup lang="ts">
import { Character } from '@/Interfaces/CharacterInterface';

interface Props {
    currentCharacter: Character
}
const props = defineProps<Props>();
</script>

<style lang="scss">
.attributes-content {
    .friendship {
        display: flex;
        font-size: 17px;

        .friendship-lvl {
            margin-left: auto;
        }
    }

    .content-right-description {
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
            font-size: 20px;
            max-height: 100px;
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .friendship {
            font-size: 15px;
        }

        .content-right-description {
            font-size: 15px;
            max-height: 60px;
        }
    }
}
</style>