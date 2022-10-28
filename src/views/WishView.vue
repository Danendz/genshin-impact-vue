<template>
    <PageTransition :condition-item="[getWeapons, getCharacters, getCurrentBanner, getStandardBanner]"
        :error="[getError, getErrorWeapons, getErroBanner]" loader-title="молитвы">
        <BannersLayout />
    </PageTransition>
</template>


<script setup lang="ts">
//stores
import { useCharacters } from '@/store/Characters/Characters';
import { useWeapons } from '@/store/Weapons/Weapons'
import { useBannersData } from '@/store/Gacha/bannersData';

//components
import PageTransition from '@/components/UI/PageTransition.vue';

//vue
import { onMounted, defineAsyncComponent } from 'vue';

const BannersLayout = defineAsyncComponent(() => import("@/components/BannersUI/BannersLayout.vue"))
const { getCharacters, getError, fetchCharacters } = useCharacters()
const { getWeapons, getErrorWeapons, fetchWeapons } = useWeapons()
const { getCurrentBanner, getStandardBanner, getErroBanner, fetchBannersData } = useBannersData()

onMounted(() => {
    fetchCharacters()
    fetchWeapons(["name", "type", "rarity", 'location'])
    fetchBannersData()
})


</script>