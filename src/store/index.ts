//enums
import {
  CharactersStore, WeaponsStore,
  PrimogemsStore,
  EventWeaponWishStore,
  EventWishStore,
  StandartWishStore,
  BannerStore,
  WishListStore
} from '@/Enums/StoreEnums'

//interface
import { IWishState } from "@/Interfaces/IWish";

//modules
import charactersModule, { CharactersState } from './characters'
import WeaponsModule, { WeaponsState } from './weapons';
import eventWishModule from './wishes/eventWish';
import standartWishModule from './wishes/standartWish';
import eventWeaponWishModule from './wishes/eventWeaponWish'
import primogemsModule, { PrimogemsState } from './wishes/primogems';
import bannerModule, { BannerState } from './banner';
import wishListModule, { WishListState } from './WishList'

//vuex
import { createStore } from 'vuex'

interface State {
  [CharactersStore.MODULE_NAME]: CharactersState,
  [WeaponsStore.MODULE_NAME]: WeaponsState,
  [PrimogemsStore.MODULE_NAME]: PrimogemsState,
  [EventWeaponWishStore.MODULE_NAME]: IWishState,
  [EventWishStore.MODULE_NAME]: IWishState,
  [StandartWishStore.MODULE_NAME]: IWishState,
  [BannerStore.MODULE_NAME]: BannerState,
  [WishListStore.MODULE_NAME]: WishListState
}
export default createStore<State>({
  modules: {
    [CharactersStore.MODULE_NAME]: charactersModule,
    [WeaponsStore.MODULE_NAME]: WeaponsModule,
    [PrimogemsStore.MODULE_NAME]: primogemsModule,
    [EventWeaponWishStore.MODULE_NAME]: eventWeaponWishModule,
    [EventWishStore.MODULE_NAME]: eventWishModule,
    [StandartWishStore.MODULE_NAME]: standartWishModule,
    [BannerStore.MODULE_NAME]: bannerModule,
    [WishListStore.MODULE_NAME]: wishListModule
  }
})
