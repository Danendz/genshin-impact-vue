<template>
    <figure class="bottom-character-container">
        <img alt="character" class="bottom-character" :src="image" />

        <figcaption class="bottom-text">Упс... Что-то пошло не так!
            <p>{{ text }}</p>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import useRequireFile from '@/Composables/useRequireFile';


interface Props {
    text: string,
    imageUrl: string
}

const props = defineProps<Props>()
const image = useRequireFile(props.imageUrl)

</script>

<style lang="scss">
.bottom-character-container {
    width: 100%;
    height: 100vh;
    display: flex;
    position: absolute;
    overflow: hidden;

    .bottom-character {
        position: absolute;
        width: 300px;
        bottom: 0;
        height: 300px;
        -webkit-user-drag: none;
        user-select: none;
        overflow: hidden;
        transition: .5s;
    }

    .bottom-text {
        position: absolute;
        bottom: 200px;
        overflow: hidden;
        background-color: white;
        padding: 80px 20px;
        max-width: 500px;
        min-width: 200px;
        text-align: center;
        border-radius: 50%;
        left: 200px;
        font-weight: bold;
        font-size: 25px;

        &:after {
            content: '';
            position: absolute;
            bottom: -25px;
            left: 0;
            width: 50px;
            height: 50px;
            background-color: white;
            border-radius: 50%;
        }
    }
}


@media only screen and (orientation: portrait) and (max-width: 500px) {
    .bottom-character-container {
        .bottom-character {
            width: 200px;
            height: 200px;
        }

        .bottom-text {
            font-size: 20px;
            bottom: 150px;
            max-width: 300px;
            left: 150px;
        }
    }
}

@media only screen and (orientation: portrait) and (max-width: 300px) {
    .bottom-character-container {
        .bottom-character {
            width: 150px;
            height: 150px;
        }

        .bottom-text {
            font-size: 20px;
            bottom: 100px;
            left: 110px;
            padding: 30px;

            &:after {
                bottom: -40px;
            }
        }
    }
}

@media only screen and (orientation: landscape) and (max-height: 500px) {
    .bottom-character-container {
        .bottom-character {
            width: 150px;
            height: 150px;
        }

        .bottom-text {
            font-size: 13px;
            max-width: 300px;
            bottom: 120px;
            left: 100px;
            padding: 50px;
        }
    }
}
</style>