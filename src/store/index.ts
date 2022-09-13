import { createStore } from 'vuex'
import { CharactersStore, WeaponsStore } from '@/Enums/StoreEnums'
import charactersModule, { CharactersState } from './characters'
import WeaponsModule, { WeaponsState } from './weapons';

interface State {
  [CharactersStore.MODULE_NAME]: CharactersState;
  [WeaponsStore.MODULE_NAME]: WeaponsState
}
export default createStore<State>({
  modules: {
    [CharactersStore.MODULE_NAME]: charactersModule,
    [WeaponsStore.MODULE_NAME]: WeaponsModule
  }
})
