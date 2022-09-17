<template>
    <div class="characters-container">
        <CharacterBG :character="currentCharacter" />

        <CharactersPanel :current-character="currentCharacter" :active-character-id="activeCharacterId"
            :characters="characters" :set-active-character="setActiveCharacter" />

        <CharactersContent />

        <CharactersBottom />

    </div>

</template>
<script setup lang="ts">

//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharactersContent.vue';
import CharactersBottom from '../../components/CharacterUI/CharactersBottom.vue';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//vue
import { ref, computed } from 'vue';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>()

const activeCharacterId = ref<number>(0)

const currentCharacter = computed(() => {
    return props.characters[activeCharacterId.value]
})

const setActiveCharacter = (id: number): void => {
    activeCharacterId.value = id
}

</script>
<style lang="scss">
.characters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}
</style>