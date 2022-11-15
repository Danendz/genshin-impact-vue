<template>
    <section v-if="randomTip" @click="changeRandomTip" class="loader">
        <section class="loader__domain">
            <i :class="`gi-${getDomain()}`" />
        </section>
        <Transition name="tip-fade" mode="out-in" appear>
            <section :key="randomTip.tip" class="loader__tips">
                <h3>
                    {{ randomTip.title }}
                </h3>
                <p>
                    {{ randomTip.tip }}
                </p>
            </section>
        </Transition>
        <section class="loader__content-progress">
            <div class="loader__line" />
            <section class="loader__icons" :style="{ backgroundSize: `${props.progress}%` }">
                <i class="gi-pyro" />
                <i class="gi-hydro" />
                <i class="gi-anemo" />
                <i class="gi-electro" />
                <i class="gi-dendro" />
                <i class="gi-cryo" />
                <i class="gi-geo" />
            </section>
            <div class="loader__line" />
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import mondstadt from '@/assets/Data/loading-tips/mondstadt.json'
import liyue from '@/assets/Data/loading-tips/liyue.json'
import inazuma from '@/assets/Data/loading-tips/inazuma.json'

interface Props {
    progress?: number;
}

const props = defineProps<Props>()

interface ILoadingTip {
    title: string,
    tip: string
}

let loadingTips: ILoadingTip[] = []
const randomTip = ref<ILoadingTip | null>(null)
let domain = 'mondstadt'
const domains = [
    'mondstadt',
    'inazuma',
    'dragonspine'
]

const mondstadtTips: ILoadingTip[] = mondstadt
const liyueTips: ILoadingTip[] = liyue
const inazumaTips: ILoadingTip[] = inazuma

const tips = [
    mondstadtTips, liyueTips, inazumaTips
]

const tipsNames = [
    'mondstadt',
    'liyue',
    'inazuma'
]

let timeout: number;

const getDomain = () => {
    return domains.includes(domain) ? domain : 'domain'
}

const getRandomTip = (): ILoadingTip => {
    return getRandomItem<ILoadingTip>(loadingTips)
}

const getRandomItem = <T extends ILoadingTip | string>(array: T[]): T => {
    const randomNum = Math.round(Math.random() * (array.length - 1))
    return array[randomNum]
}

const changeRandomTip = () => {
    if (!randomTip.value) return;
    let newRandomTip = getRandomTip()
    if (randomTip.value.tip === newRandomTip.tip) {
        const id = loadingTips.findIndex((tip) => newRandomTip.tip === tip.tip)
        newRandomTip = id >= 0 && id < loadingTips.length - 1 ? loadingTips[id + 1] : loadingTips[id - 1]
    }
    randomTip.value = newRandomTip
}

const setTips = async () => {
    const randomNum = Math.round(Math.random() * (tipsNames.length - 1))
    domain = tipsNames[randomNum]
    loadingTips = tips[randomNum]
    randomTip.value = getRandomTip()
}

onMounted(() => {
    setTips()

})

watch(randomTip, () => {
    if (randomTip.value) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            changeRandomTip()
        }, randomTip.value.tip.length * 70);
    }
})


</script>

<style lang="scss">
$textColor: #8599a8;

.tip-fade-enter-active,
.tip-fade-leave-active {
    transition: opacity 0.25s ease;
}

.tip-fade-enter-from,
.tip-fade-leave-to {
    opacity: 0;
}

.loader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    user-select: none;
    z-index: 99;

    &__domain {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        i {
            color: $textColor;
            font-size: 250px;
            line-height: 0;
        }
    }

    &__tips {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 6px;
        color: #8599a8;
        margin-bottom: 15px;
        max-width: 500px;
        width: 100%;
    }

    &__content-progress {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        .loader__line {
            width: 100%;
            height: 2px;
            background-color: $textColor;
            opacity: 0.5;
        }

        .loader__icons {
            height: fit-content;
            margin-left: 10px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background-clip: text;
            background-image: linear-gradient(to left, #495366 0%, #495366 100%);
            -webkit-text-fill-color: #4953665e;
            background-repeat: no-repeat;
            background-size: 0%;

            i {
                font-size: 35px;
                line-height: 0;
            }
        }
    }
}

@media only screen and (max-width: 915px) {
    .loader {
        gap: 5px;

        &__domain {
            i {
                font-size: 160px;
            }
        }

        &__tips {
            max-width: 90%;
        }

        &__content-progress {
            margin-bottom: 10px;

            .loader__icons {
                i {
                    font-size: 25px;
                }
            }
        }
    }
}
</style>