<template>
    <main class="characters-container">
        <CharacterBG />
        <Transition name="fade-up" appear>
            <CharactersPanel v-show="!hideLayout.hide" :characters="characters" />
        </Transition>
        <CharactersContent :hide="hideLayout.hide" />
        <Transition name="fade-left" appear>
            <CharacterSelection v-show="hideLayout.hide" :characters="props.characters" />
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

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//vue
import { onMounted } from 'vue';


interface Props {
    characters: Character[]
}

const props = defineProps<Props>()

const hideLayout = useHideMainCharactersLayout()
const store = useCurrentCharacter()

onMounted(() => {
    store.setCurrentCharacter(props.characters[0], 0)
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