<template>
    <main class="characters-container">
        <CharacterBG />
        <CharactersPanel />
        <CharactersContent />
        <CharacterSelection />
        <CharactersBottom />
    </main>

</template>
<script setup lang="ts">
//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBackground/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharacterContent/CharactersContent.vue';
import CharacterSelection from './CharacterSelection/CharacterSelection.vue';
import CharactersBottom from './CharactersBottom.vue';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useCharacters } from '@/store/Characters';

//vue
import { onMounted } from 'vue';

const store = useCurrentCharacter()
const characters = useCharacters()

onMounted(() => {
    if (characters.getCharacters) {
        if (!store.currentCharacter) {
            store.setCurrentCharacter(characters.getCharacters[0])
        } else {
            store.setCurrentCharacter(store.currentCharacter)
        }
    }
})
</script>
<style lang="scss">
.characters-container {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    position: relative;
    align-items: center;
    margin: 0 auto;
    height: 100vh;
}
</style>
