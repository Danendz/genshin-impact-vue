<template>
    <div class="characters-panel">
        <div class="panel-content">
            <div class="info">
                <img alt="vision"
                    src="https://static.wikia.nocookie.net/gensin-impact/images/1/1d/Vision_Mondstadt_Cryo.png/" />
                <p>Cryo/ Ganyu</p>
            </div>
            <div ref="characters_scroll" class="characters">
                <div class="char-icon" v-for="(url, index) in props.urlToImages" :key="index">
                    <img :alt="`char icon ${index}`" :src="url" />
                </div>
            </div>
            <div class="close">
                <button>X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
interface Props {
    urlToImages?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    urlToImages: () => ['https://api.genshin.dev/characters/ganyu/icon-side', 'https://api.genshin.dev/characters/albedo/icon-side']
})

const characters_scroll = ref<null | HTMLDivElement>(null)
watch(characters_scroll, () => {
    if (characters_scroll.value) {
        characters_scroll.value.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (characters_scroll.value) {
                characters_scroll.value.scrollLeft += e.deltaY
            }
        })
        characters_scroll.value.addEventListener('mousedown', (e) => {
            if (characters_scroll.value) {
                const pos = {
                    left: characters_scroll.value.scrollLeft,
                    x: e.clientX,
                }
                const mouseMoveHandler = (event: MouseEvent) => {
                    const dx = event.clientX - pos.x
                    if (characters_scroll.value) {
                        characters_scroll.value.scrollLeft = pos.left - dx
                    }
                }
                const mouseUpHandler = () => {
                    if (characters_scroll.value) {
                        characters_scroll.value.removeEventListener('mousemove', mouseMoveHandler)
                        characters_scroll.value.removeEventListener('mouseup', mouseUpHandler)
                    }
                }
                characters_scroll.value.addEventListener('mousemove', mouseMoveHandler)
                characters_scroll.value.addEventListener('mouseup', mouseUpHandler)
                characters_scroll.value.addEventListener('mouseleave', mouseUpHandler)
            }
        })
    }
})

</script>

<style lang="scss">
.characters-panel {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.11);

    .panel-content {
        width: 70%;
        display: flex;
        flex-shrink: 1;
        align-items: center;
        justify-content: space-between;

        .info {
            display: flex;
            align-items: center;

            img {
                width: 70px;
            }
        }

        .characters {
            display: flex;
            gap: 15px;
            min-width: 25%;
            max-width: 50%;
            overflow-x: scroll;
            transition: .5s;
            user-select: none;

            .char-icon {
                display: flex;
                border-radius: 50%;
                width: 55px;
                background-color: #20466a;
                border: 3px solid #6c9992;

                img {
                    transform: translateX(10px);
                    user-select: none;
                    width: 100%;
                    -webkit-user-drag: none;
                }
            }

            .active-character {
                background-color: #5bb8d9;
                border: 3px solid #7ec8b9;
            }
        }

        .close {
            display: flex;
            justify-content: flex-end;

            button {
                margin-right: 5px;
            }
        }
    }

}
</style>