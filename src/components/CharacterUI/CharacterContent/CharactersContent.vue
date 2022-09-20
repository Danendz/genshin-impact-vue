<template>
    <div class="characters-central">
        <ContentOptions :active_content="active_content" @set-active-content="setActiveContent" />
        <div class="centerContent">

        </div>
        <AttributesContent />

        <CharactersBottom />
    </div>
</template>

<script setup lang="ts">
//components
import ContentOptions from './ContentOptions.vue';
import AttributesContent from './ContentRight/AttributesContent.vue';
import CharactersBottom from './CharactersBottom.vue'

//vue
import { ref } from 'vue'


const active_content = ref<number>(0)
const setActiveContent = (index: number): void => {
    active_content.value = index
}
</script>


<style lang="scss">
.characters-central {
    color: white;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    text-shadow:
        0.07em 0 black,
        0 0.07em black,
        -0.07em 0 black;
    width: 80%;
    height: 50%;
    margin-top: 10px;
}

@media only screen and (max-width: 1366px) {
    .characters-central {
        width: 95%;
        justify-content: space-between;

    }
}

@media only screen and (orientation: portrait) {
    .characters-central {
        align-items: center;
        height: 100%;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .characters-central {
        flex-direction: column;
        align-items: center;
        height: 100%;
    }
}
</style>

