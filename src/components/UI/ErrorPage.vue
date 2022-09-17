<template>
    <div class="errorPage" v-if="props.errorMessage === ErrorMessages.NOT_FOUND || !props.errorMessage">
        <img class="surprisedPaimon " src="@/assets/paimonImages/surprisedPaimon.webp" />
        <p class="notFoundText">Упс... Мы не нашли такую страничку!</p>
    </div>
</template>

<script setup lang="ts">
import { ErrorMessages } from '@/Enums/ErrorMessages';

interface Props {
    errorMessage?: ErrorMessages
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
    .surprisedPaimon {
        position: absolute;
        width: 300px;
        bottom: 0;
        height: 300px;
        -webkit-user-drag: none;
        user-select: none;
        transition: .5s;   
    }
    .notFoundText{
        position: absolute;
        bottom: 200px;
        background-color: white;
        padding: 80px 20px; 
        text-align: center;
        border-radius: 50%;
        left: 200px;
        font-weight: bold;
        font-size: 30px;
        &:after{
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
    .errorPage {
        .surprisedPaimon {
            width: 200px;
            height: 200px;
        }
        .notFoundText{
            font-size: 20px;
            bottom: 150px;
            left: 150px;
        }
    }
}
@media only screen and (orientation: portrait) and (max-width: 300px) {
    .errorPage {
        .surprisedPaimon {
            width: 150px;
            height: 150px;
        }
        .notFoundText{
            font-size: 20px;
            bottom: 100px;
            left: 110px;
            padding: 30px;
            &:after{
                bottom: -40px;
            }
        }
    }
}
@media only screen and (orientation: landscape) and (max-height: 500px) {
    .errorPage {
        .surprisedPaimon {
            width: 150px;
            height: 150px;
        }
        .notFoundText{
            font-size: 20px;
            bottom: 120px;
            left: 100px;
            padding: 50px;
        }
    }
}
</style>