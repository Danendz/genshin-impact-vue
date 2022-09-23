<template>
    <transition name="fade">
        <div v-show="active_state" @click.self="emit('close-modal')" class="modal">
            <div :class="['modal-content', props.modalStyle]">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
interface Props {
    modalStyle: 'details',
    active_state: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'close-modal'): void
}>()
</script>

<style lang="scss">
.modal {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.767);

    .modal-content {}

    .details {
        display: flex;
        width: 50%;
        height: 100%;
        justify-content: center;
    }
}
@media only screen and (orientation: portrait){
    .modal{
        .details{
            width: 82%;
        }
    }
}
@media only screen and (orientation: landscape) and (max-height: 820px){
    .modal{
        .details{
            width: 70%;
        }
    }
}
</style>
