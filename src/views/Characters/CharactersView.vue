<template>
    <div v-if="characters === ErrorMessages.NOT_FOUND">
        <ErrorPage :error-message="ErrorMessages.NOT_FOUND" />
    </div>
    <div v-else-if="characters" class="characters-container">
        <CharacterPanel :active-character="activeCharacter" :characters="characters"
            @set-active-character="setActiveCharacter" />
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

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages';

//vue
import { ref } from 'vue';

const activeCharacter = ref<number>(0)

const { characters } = useGetCharacters()

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
    width: 8px;
    height: 8px;
}

*::-webkit-scrollbar-track {
    background: transparent;
}

*::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover{
    cursor: pointer;
}
.characters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;


}
</style>