<template>
    <figure class="characters-info" v-if="store.currentCharacter">
        <Transition :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" mode="out-in">
            <img :key="store.currentCharacter.vision" alt="vision" data-index="0"
                :src="CharacterHelper.getElementImage(store.currentCharacter.vision.toLowerCase())" />
        </Transition>
        <figcaption class="characters-info__visionAndName">
            <Transition :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" mode="out-in">
                <span data-index="1" :key=" store.currentCharacter.vision">
                    {{store.currentCharacter.vision}}
                </span>
            </Transition>
            <Transition :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" mode="out-in">
                <span data-index="2" :style="{width: '100%', whiteSpace: 'nowrap'}"
                    :key="store.currentCharacter.name">/{{store.currentCharacter.name}}</span>
            </Transition>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

import gsap from 'gsap'

const store = useCurrentCharacter()

function onBeforeEnter(el: Element) {
    const element = el as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(50%)'
}

let currentIndex = -1;

function onEnter(el: Element, done: () => void) {
    const element = el as HTMLElement
    currentIndex += 1
    let delay = 0.3;

    if (element.dataset.index) {
        const index = parseInt(element.dataset.index)
        if (index === currentIndex) delay += index * 0.1
    }

    gsap.from(element, {
        transform: 'translateY(50%)'
    })
    gsap.to(element, {
        opacity: 1,
        duration: 0.2,
        delay: delay,
        transform: 'translateY(0)',
        onComplete: done
    })
}

function onLeave(el: Element, done: () => void) {
    const element = el as HTMLElement
    currentIndex = -1
    gsap.to(element, {
        opacity: 0,
        duration: 0.4,
        transform: 'translateY(-30%)',
        onComplete: done
    })
}
</script>

<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-info {
    display: flex;
    align-items: center;
    width: 25%;
    height: $infoHeight;
    gap: 10px;

    img {
        width: 45px;
        height: $infoHeight;
    }

    &__visionAndName {

        transition: .3s;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #e0dac0;
    }
}

@media only screen and (max-width: 915px) {
    .characters-info {
        width: fit-content;

        img {
            width: 30px;
            height: 30px;
            margin-left: 15px;
            margin-right: 10px;
        }
    }
}
</style>