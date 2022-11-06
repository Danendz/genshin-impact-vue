<template>
    <article class="errorPage">
        <BottomCharacter image-url="paimonImages/surprisedPaimon.webp"
            :text="`Ошибка: ${props.errorMessage ?? ErrorMessages.NOT_FOUND}`" />
    </article>
</template>

<script setup lang="ts">

//components
import { ErrorMessages } from '@/Enums/ErrorMessages';
import BottomCharacter from './BottomCharacter.vue';

interface Props {
    errorMessage?: string
}
const props = defineProps<Props>()

</script>

<style lang="scss">
.errorPage {
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
}
</style>