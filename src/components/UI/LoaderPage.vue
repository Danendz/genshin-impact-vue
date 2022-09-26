<template>
    <figure class="loader">
        <img alt="loading character" src="@/assets/paimonImages/paimonExcited.webp"/>
        <figcaption>Загружаем {{props.title}}...</figcaption>
    </figure>
</template>

<script setup lang="ts">
    interface Props {
        title?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        title: 'Что-то'
    })
</script>

<style lang="scss">
    .loader{
        width: 100%;
        height: 100vh;
        background-color: #dfdcd1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        figcaption{
            font-size: 25px;
            font-family:'Times New Roman', Times, serif;
            font-weight: bold;
        }
        img{
            user-select: none;
            -webkit-user-drag: none;
            transform: scaleX(-1);
            animation: paimonJumping .3s infinite;
            width: 350px;
        }

    }
    @keyframes paimonJumping {
        from {
            transform: translateY(0);
        }
        to{
            transform: translateY(-2px);
        }
    }
   @media only screen and (max-height: 412px) and (orientation: landscape){
    .loader{
        img{
            width: 250px;
        }
    }
   }
</style>