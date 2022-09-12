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
//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//api
import CharacterService from '@/API/CharacterService';

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages';

//components
import ErrorPage from '@/components/UI/ErrorPage.vue';

//vue
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'

const name: string = useRoute().params.name.toString();
const character = ref<Character | null | ErrorMessages.NOT_FOUND>(null)
const characterService = new CharacterService();

const getCharacter = async () => {
    const data: Character | ErrorMessages.NOT_FOUND = await characterService.getByName(name)
    character.value = data
}

onMounted(() => {
    getCharacter();
})

</script>