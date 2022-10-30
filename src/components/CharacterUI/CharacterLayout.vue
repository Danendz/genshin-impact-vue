<template>
    <main class="characters-container">
        <CharacterBG />
        <CharactersPanel />
        <CharactersContent />
        <Suspense v-if="isCharacterSelectionLoaded">
            <template #default>
                <CharacterSelection />
            </template>
            <template #fallback>
                <LoaderSpinner :style="{ width: '30%', left: 0, top: 0 }" />
            </template>
        </Suspense>
        <CharactersBottom />
    </main>
</template>
<script setup lang="ts">
//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBackground/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharacterContent/CharactersContent.vue';
import CharactersBottom from './CharactersBottom.vue';
import LoaderSpinner from '../UI/LoaderSpinner.vue';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useCharacters } from '@/store/Characters/Characters';

//stores
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';

//vue
import { onMounted, defineAsyncComponent, ref, watch } from 'vue';

const isCharacterSelectionLoaded = ref(false)
const showCharactersSelectionList = useShowCharactersSelectionList()

watch(() => showCharactersSelectionList.show, () => {
    isCharacterSelectionLoaded.value = true
})

const CharacterSelection = defineAsyncComponent({
    "loader": () => import('./CharacterSelection/CharacterSelection.vue')
})

const store = useCurrentCharacter()
const characters = useCharacters()

onMounted(() => {
    if (characters.getCharacters.value) {
        if (!store.currentCharacter) {
            store.setCurrentCharacter(characters.getCharacters.value[0])
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
