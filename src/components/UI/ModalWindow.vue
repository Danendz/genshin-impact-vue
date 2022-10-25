<template>
    <transition name="fade">
        <article v-show="active_state" @click.self="() => emit('close-modal', false)" class="modal">
            <section :class="['modal-content', props.modalStyle]">
                <slot />
            </section>
        </article>
    </transition>
</template>

<script setup lang="ts">
interface Props {
    modalStyle: 'details',
    active_state: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'close-modal', value?: boolean): void
}>()
</script>

<style lang="scss">
.modal {
    position: fixed;
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
    backdrop-filter: blur(8px);

    .modal-content {}

    .details {
        display: flex;
        width: 50%;
        height: 100%;
        justify-content: center;
    }
}

@media only screen and (orientation: portrait) {
    .modal {
        .details {
            width: 82%;
        }
    }
}

@media only screen and (orientation: landscape) and (max-height: 820px) {
    .modal {
        .details {
            width: 70%;
        }
    }
}
</style>
