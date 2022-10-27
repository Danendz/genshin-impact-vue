<template>
    <div v-if="getWeapons && getCharacters && getCurrentBanner && getStandardBanner">
        <button @click="makeWish">Make Wish Great Again</button>
        <button @click="addWishes(10, BannerTypes.EVENT_WEAPON)">addWishes</button>
    </div>
    <div v-else>Loading...</div>
</template>


<script setup lang="ts">

import { useWish } from '@/store/Gacha/Wish';
import { useCharacters } from '@/store/Characters/Characters';
import { useWeapons } from '@/store/Weapons/Weapons'
import { BannerTypes } from '@/Enums/WishEnums';
import { onMounted } from 'vue';
import { useBannersData } from '@/store/Gacha/bannersData';

const { getCharacters, fetchCharacters } = useCharacters()
const { getWeapons, fetchWeapons } = useWeapons()
const { getCurrentBanner, getStandardBanner, fetchBannersData } = useBannersData()
const { makeWishes, addWishes } = useWish()

onMounted(() => {
    fetchCharacters()
    fetchWeapons(["name", "type", "rarity", 'location'])
    fetchBannersData()
})

const makeWish = () => {
    console.log(makeWishes(10, BannerTypes.EVENT_WEAPON))
}



</script>