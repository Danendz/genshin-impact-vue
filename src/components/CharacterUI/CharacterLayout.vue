<template>
    <div class="characters-container">
        <CharacterBG />
        <Transition name="fade-up">
            <CharactersPanel v-if="!storeShowAllCharacters.showAllCharacters" :active-character-id="activeCharacterId"
                :characters="characters" :set-active-character="setActiveCharacter" />
        </Transition>
        <CharactersContent :show-all-characters="storeShowAllCharacters.showAllCharacters" />
        <AllCharacters v-show="storeShowAllCharacters.showAllCharacters" />
    </div>

</template>
<script setup lang="ts">
//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharacterContent/CharactersContent.vue';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useShowAllCharacters } from '@/store/showAllCharacters';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//vue
import { ref, onMounted } from 'vue';
import AllCharacters from './AllCharacters/AllCharacters.vue';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>()

const storeShowAllCharacters = useShowAllCharacters()

const activeCharacterId = ref<number>(0)
const storeCurrentCharacter = useCurrentCharacter()

onMounted(() => {
    setActiveCharacter(0)
})

const setActiveCharacter = (id: number): void => {
    activeCharacterId.value = id
    storeCurrentCharacter.setCurrentCharacter(props.characters[activeCharacterId.value])

}

</script>
<style lang="scss">
.characters-container {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    height: 100vh;
}
</style>