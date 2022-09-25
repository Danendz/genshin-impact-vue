<template>
    <div class="characters-container">
        <CharacterBG />
        <Transition name="fade-up" appear>
            <CharactersPanel v-if="!hideLayout.hide" :active-character-id="activeCharacterId" :characters="characters"
                :set-active-character="setActiveCharacter" />
        </Transition>
        <CharactersContent :hide="hideLayout.hide" />
        <Transition name="fade-left" appear>
            <CharacterSelection v-if="hideLayout.hide" :characters="characters" />
        </Transition>
    </div>

</template>
<script setup lang="ts">
//components
import CharactersPanel from '@/components/CharacterUI/CharacterPanel/CharactersPanel.vue'
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';
import CharactersContent from '@/components/CharacterUI/CharacterContent/CharactersContent.vue';
import CharacterSelection from './CharacterSelection/CharacterSelection.vue';

//stores
import { useCurrentCharacter } from '@/store/currentCharacter';
import { useHideMainCharactersLayout } from '@/store/hideMainCharactersLayout';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//vue
import { ref, onMounted } from 'vue';

interface Props {
    characters: Character[]
}

const props = defineProps<Props>()

const hideLayout = useHideMainCharactersLayout()

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
    position: relative;
    align-items: center;
    margin: 0 auto;
    height: 100vh;
}
</style>