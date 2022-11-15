<template>
    <PageTransition
        :condition-item="[getWeapons, getCharacters, getEventBanner, getEventWeaponBanner, getStandardBanner, getWishVideos]"
        :error="[getError, getErrorWeapons, getErrorBanner]"
        :component="import('@/components/BannersUI/BannersLayout.vue')" />
</template>


<script setup lang="ts">
//stores
import { useCharacters } from '@/store/Characters/Characters';
import { useWeapons } from '@/store/Weapons/Weapons'
import { useBannersData } from '@/store/Gacha/bannersData';
import { useWishVideos } from '@/store/Gacha/wishVideos'

//components
import PageTransition from '@/components/UI/PageTransition.vue';

//vue
import { onMounted } from 'vue';

const { getCharacters, getError, fetchCharacters } = useCharacters()
const { getWeapons, getErrorWeapons, fetchWeapons } = useWeapons()
const { getEventBanner, getEventWeaponBanner, getStandardBanner, getErrorBanner, fetchBannersData } = useBannersData()
const { fetchWishVideos, getWishVideos } = useWishVideos()
onMounted(() => {
    fetchCharacters()
    fetchWeapons(["name", "type", "rarity", 'location'])
    fetchBannersData()
    fetchWishVideos()
})


</script>