<template>
    <div v-if="getWeapons && getCharacters">
        <button @click="makeWish">Make Wish Great Again</button>
        <button @click="addWishes(10, BannerTypes.STANDARD)">addWishes</button>
    </div>
    <div v-else>Loading...</div>
</template>


<script setup lang="ts">

import { useWish } from '@/store/Gacha/Wish';
import { useCharacters } from '@/store/Characters/Characters';
import { useWeapons } from '@/store/Weapons/Weapons'
import { BannerTypes } from '@/Enums/WishEnums';
import { onMounted } from 'vue';

const { getCharacters, fetchCharacters } = useCharacters()
const { getWeapons, fetchWeapons } = useWeapons()
const { makeWishes, addWishes } = useWish()

onMounted(() => {
    fetchCharacters()
    fetchWeapons(["name", "type", "rarity", 'location'])
})

const makeWish = () => {
    console.log(makeWishes(10, BannerTypes.EVENT))
}



</script>