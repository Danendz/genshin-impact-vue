<template>
    <div>
        {{props.errorMessage}}
    </div>
</template>

<script setup lang="ts">
import { ErrorMessages } from '@/Enums/ErrorMessages';

interface Props {
    errorMessage: ErrorMessages
}
const props = defineProps<Props>()
</script>