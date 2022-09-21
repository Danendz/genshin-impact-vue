<template>
    <div class="characters-container">
        <CharacterBG />

        <CharactersPanel :active-character-id="activeCharacterId"
            :characters="characters" :set-active-character="setActiveCharacter" />

        <CharactersContent />

    </div>

</template>
<script setup lang="ts">
//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharacterContent/CharactersContent.vue';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//vue
import { ref, onMounted } from 'vue';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>()

const activeCharacterId = ref<number>(0)
const storeCurrentCharacter = useCurrentCharacter()

onMounted(() => {
    setActiveCharacter(0)
})

const setActiveCharacter = (id: number): void => {
    activeCharacterId.value = id
    storeCurrentCharacter.setCurrentCharacter(props.characters[activeCharacterId.value])
    console.log(storeCurrentCharacter.currentCharacter)
}

</script>
<style lang="scss">
.characters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    height: 100vh;
}
</style>