<template>
    <div v-if="characters === ErrorMessages.NOT_FOUND">
        <ErrorPage :errorMessage="ErrorMessages.NOT_FOUND" />
    </div>
    <div v-else-if="characters">
        <CharactersList />
    </div>
    <div v-else>Loading...</div>
</template>

<script setup lang="ts">
//composables
import { useGetCharacters } from '@/Composables/useGetCharacters'
import { useGetWeapons } from '@/Composables/useGetWeapons'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'
import { CharactersStore, WeaponsStore, WishListStore } from '@/Enums/StoreEnums';

//components
import ErrorPage from '@/components/UI/ErrorPage.vue';
import CharactersList from '../components/CharactersList.vue';

//vue
import { useStore } from 'vuex';
import { watch } from 'vue';
import { IWishItemsList } from '@/Interfaces/IWish';
/* import useMakeWish from '@/Composables/useMakeWish'; */

const store = useStore()
const { characters } = useGetCharacters()
const { weapons } = useGetWeapons()
/* const { makeWishes } = useMakeWish(); */
const wishList: IWishItemsList = {
    event5: ['gan yu'],
    event4: ['gorou'],
    eventWeapon4: ['favoinus'],
    eventWeapon5: ['amos bow'],
    standart3: ['some blade', 'another', 'and another'],
    standart5: ['another blade'],
    standart4: ['xinyan', 'heizou']
}
useStore().commit(WishListStore.SET_WISH_LIST, wishList)
useStore().state[WishListStore.MODULE_NAME][WishListStore.STATE_WISH_LIST]

watch(characters, () => {
    if (characters.value && characters.value !== ErrorMessages.NOT_FOUND) {
        store.commit(CharactersStore.SET_CHARACTERS, characters)
    }
})
watch(weapons, () => {
    if (weapons.value && weapons.value !== ErrorMessages.NOT_FOUND) {
        store.commit(WeaponsStore.SET_WEAPONS, weapons)
    }
})

/* const makeTenWishes = () => {
    console.log(makeWishes(10))   
} */

</script>