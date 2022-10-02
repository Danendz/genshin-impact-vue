<template>
    <main class="characters-container">
        <CharacterBG />
        <Transition name="fade-up" appear>
            <CharactersPanel v-show="!hideLayout.hide" />
        </Transition>
        <CharactersContent :hide="hideLayout.hide" />
        <Transition name="fade-left" appear>
            <CharacterSelection v-show="showCharactersSelectionList.show" />
        </Transition>
    </main>

</template>
<script setup lang="ts">
//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharacterContent/CharactersContent.vue';
import CharacterSelection from './CharacterSelection/CharacterSelection.vue';

//stores
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useShowCharactersSelectionList } from '@/store/showCharactersSelectionList';

//vue
import { onMounted } from 'vue';
import { useCharacters } from '@/store/Characters';

const hideLayout = useHideMainCharactersLayout()
const store = useCurrentCharacter()
const characters = useCharacters()
const showCharactersSelectionList = useShowCharactersSelectionList()

onMounted(() => {
    if(characters.getCharacters){
        if(!store.currentCharacter){
            store.setCurrentCharacter(characters.getCharacters[0])
        }else{
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
