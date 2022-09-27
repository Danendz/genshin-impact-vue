<template>
    <div class="wish-content">
        <section v-for="value, key in filter" :key="key">
            <label>{{key}}</label>
            <section v-for="option_value, option in value" :key="option">
                <label>{{option}}</label>
                <input type="checkbox" v-model="characters.sortAndFilter.filter[key][option]" @change="changeValue()" />
            </section>

        </section>
    </div>
</template>

<script setup lang="ts">
import { useCharacters } from '@/store/Characters';
import { onMounted } from 'vue';
import { filter } from "@/Interfaces/FilterCharacter";

const characters = useCharacters()
onMounted(() => {
    characters.fetchCharacters()
})

function changeValue(): void {
    if(characters.getCharacters){
        console.log(characters.getCharacters)
    }
}
</script>

<style>
.wish-content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    align-items: center;
    justify-content: center;
}
</style>