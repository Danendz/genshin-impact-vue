<template>
    <div v-if="characterFiltered === ErrorMessages.NOT_FOUND || characterFiltered?.length === 0">
        <ErrorPage :error-message="ErrorMessages.NOT_FOUND" />
    </div>
    <div v-else-if="characterFiltered && currentCharacter" class="characters-container">
        <CharacterBG :character="currentCharacter" />
        <CharacterPanel :current-character="currentCharacter" :active-character="activeCharacter"
            :characters="characterFiltered" @set-active-character="setActiveCharacter" />

        <div class="characters-central">
            <div class="options">
                <ul>
                    <li>Attributes</li>
                    <li>Weapons</li>
                    <li>Artifacts</li>
                    <li>Constellation</li>
                    <li>Talents</li>
                    <li>Profile</li>
                </ul>
            </div>
            <div class="centerContent">

            </div>
            <div class="rightContent">
                <h1 class="name">Ganyu</h1>
                <p class="rarity">*****</p>
                <p>Level 90 / <span class="max-lvl">90</span></p>
                <progress value="0" />
                <div class="stats-bar">
                    <div class="stat">
                        <img />
                        <span>Max Hp</span>
                        <span>15,033</span>
                    </div>
                </div>
                <button>Details</button>
                <div class="friendship">
                    <span>Friendship</span>
                    <span>8</span>
                </div>
                <progress value="0" />
                <p>Description</p>
            </div>
        </div>
        <div class="characters-bottom">
            <div class="toggleView">
                <button><img />T</button>
            </div>
            <div class="rightButtons">
                <button><img /><span>Dressing Room</span></button>
            </div>
        </div>
    </div>
    <div v-else> Loading ...</div>
</template>

<script setup lang="ts">
//composables
import { useGetCharacters } from '@/Composables/useGetCharacters';

//components
import CharacterPanel from '@/components/CharacterUI/CharacterPanel.vue'
import ErrorPage from '@/components/UI/ErrorPage.vue';
import CharacterBG from '@/components/CharacterUI/CharacterBG.vue';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages';

//vue
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const activeCharacter = ref<number>(0)

const name: string | string[] = useRoute().params.name;
const characters = useGetCharacters()

const characterFiltered = computed(() => {
    if (Array.isArray(characters.value) && name) {
        return characters.value.filter((char) => char.name.toLowerCase().includes(name.toString().toLowerCase()))
    }
    return characters.value
})

const currentCharacter = ref<Character | null>(null)

watch([activeCharacter, characters], () => {
    if (Array.isArray(characterFiltered.value)) {
        currentCharacter.value = characterFiltered.value[activeCharacter.value]
    }
})

const setActiveCharacter = (id: number): void => {
    activeCharacter.value = id
}
</script>

<style lang="scss">
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: thin;
    scrollbar-color: #7a7a7a #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 5px;
    height: 8px;
}

*::-webkit-scrollbar-track {
    background: transparent;
}

*::-webkit-scrollbar-thumb {
    background-color: #e0dac0;
    border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
}

.characters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;


}
</style>