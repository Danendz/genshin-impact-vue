<template>
    <article class="errorPage" v-if="props.errorMessage === ErrorMessages.NOT_FOUND || !props.errorMessage">
        <BottomCharacter image-url="paimonImages/surprisedPaimon.webp" text="Упс... Мы не нашли такую страничку!" />
    </article>
</template>

<script setup lang="ts">
//enums
import { ErrorMessages } from '@/Enums/ErrorMessages';

//components
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