<template>
    <PageTransition :component="import('@/components/CharacterUI/CharacterLayout.vue')" :error="[getError]"
        :condition-item="[getCharacters]" />
</template>

<script setup lang="ts">
//composables
import useSetDefaultLayout from '@/Composables/useSetDefaultLayout'

//components
import PageTransition from '@/components/UI/PageTransition.vue'

//stores
import { useCharacters } from '@/store/Characters/Characters';

//vue
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentCharacter } from '@/store/currentCharacter';

const name = useRoute().params.name
const { fetchCharacters, getCharacters, getError } = useCharacters()
const { setLayout } = useSetDefaultLayout()
const store = useCurrentCharacter()

//fetch character
onMounted(() => {
    setLayout()
    if (getCharacters.value && name) {
        const findedCharacter = getCharacters.value.find((character) => character.name_key === name)

        if (!findedCharacter) throw new Error('Не удалось найти персонажа по имени!')

        store.setCurrentCharacter(findedCharacter)
        return;
    }
    if (name) {
        fetchCharacters(name.toString())
    } else {
        fetchCharacters()
    }
})


</script>