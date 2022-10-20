<template>
    <header class="base-info">
        <h1 class="name">{{props.currentCharacter.name}}</h1>
        <p>
            <TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" appear>
                <Icon class="rarity" v-for="rarity, index in props.currentCharacter.rarity" :key="rarity"
                    icon="mdi:star-four-points" :data-index="index" />
            </TransitionGroup>
        </p>
        <p class="base-lvl">Level 90 / <span class="max-lvl">90</span></p>
        <progress class="lvl-progress" value="100" max="100" />
    </header>
</template>

<script setup lang="ts">
import { Character } from '@/Interfaces/CharacterInterface';
import { Icon } from '@iconify/vue'
import gsap from 'gsap'

interface Props {
    currentCharacter: Character
}

const props = defineProps<Props>();

function onBeforeEnter(el: Element) {
    const element = el as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(50%)'
}

function onEnter(el: Element, done: () => void) {
    const element = el as HTMLElement
    gsap.from(element, {
        transform: 'translateY(50%)'
    })
    gsap.to(element, {
        opacity: 1,
        duration: 0.3,
        transform: 'translateY(0)',
        onComplete: done
    })
}

function onLeave(el: Element, done: () => void) {
    const element = el as HTMLElement
    gsap.to(element, {
        opacity: 0,
        duration: 0.3,
        transform: 'translateY(-30%)',
        onComplete: done
    })
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