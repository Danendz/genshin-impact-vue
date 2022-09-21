<template>
    <div class="loader-content">
    <BottomCharacter image-url="smallCharactersImg/hutao-thumb-star.webp" :text="text"/>
    </div>
</template>

<script setup lang="ts">
import BottomCharacter from './BottomCharacter.vue';
const dialogs = [
    'А вы знали, что геншину совсем скоро третий год исполняется?',
    'Загружаемся! Не волнуйтесь',
    "Раз, два, три - контент загрузись!",
    "Анекдот дня: Кли играла в карты и проиграла. Но Кли умела делать хорошую мину при плохой игре. Когда Кли ушла, мина сработала."
]
const randomNum = Math.round(Math.random() * (dialogs.length - 1))
const text = dialogs[randomNum]
</script>

<style lang="scss">
    .loader-content{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    @media only screen and (orientation: portrait){
        .loader-content{
            display:none;
        }
    }
</style>