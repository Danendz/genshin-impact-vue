<template>
	<button @click="makeWish">Make Wish Great Again</button>
	<button @click="addWishes(10, BannerTypes.EVENT)">addWishes</button>
</template>

<script setup lang="ts">

import { BannerTypes } from '@/Enums/WishEnums';
import { useWish } from '@/store/Gacha/Wish';

const { makeWishes, addWishes } = useWish()

const makeWish = () => {

	console.log(makeWishes(10, BannerTypes.EVENT, 0))
}

</script>