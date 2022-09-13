<template>
    <div v-if="character === ErrorMessages.NOT_FOUND">
        <ErrorPage :errorMessage="ErrorMessages.NOT_FOUND" />
    </div>
    <div v-else-if="character">
        <p>{{character.name}}</p>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
//composables 
import { useGetCharacterByName } from '@/Composables/useGetCharacters';

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages';

//components
import ErrorPage from '@/components/UI/ErrorPage.vue';

//vue
import { useRoute } from 'vue-router';

const name: string = useRoute().params.name.toString();
const { character } = useGetCharacterByName(name)
</script>