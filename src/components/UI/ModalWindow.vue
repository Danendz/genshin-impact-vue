<template>
    <transition :name="animationName ?? 'fade'">
        <article :style="isBgTransparent ? { backgroundColor: 'transparent' } : {}" v-show="active_state"
            @mousedown.self="closeModal" class="modal">
            <section :class="[props.modalStyle]">
                <slot />
            </section>
        </article>
    </transition>
</template>

<script setup lang="ts">
interface Props {
    modalStyle: 'details' | 'popupModal',
    active_state: boolean,
    isBgTransparent?: boolean,
    animationName?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'close-modal', value: boolean): void
}>()

const closeModal = () => {
    emit('close-modal', false)
}
</script>

<style lang="scss">
@import '@/assets/Styles/animations';
@import '@/assets/Styles/HomeUI/animations';

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

    .modal-content {}

    .popupModal {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        max-height: 600px;
        width: 90%;
        height: 100%;
    }

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

        .popupModal {
            width: 100%;
            max-width: 600px;
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
