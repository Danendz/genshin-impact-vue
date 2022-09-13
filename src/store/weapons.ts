import { WeaponsStore } from "@/Enums/StoreEnums";
import { Weapon } from "@/Interfaces/WeaponInterface";

export interface WeaponsState {
    [WeaponsStore.STATE_WEAPONS]: Weapon[]
}

export default {
    state: (): WeaponsState => ({
        [WeaponsStore.STATE_WEAPONS]: []
    }),
    getters: {

    },
    mutations: {
        setWeapons(state: WeaponsState, value: Weapon[]) {
            state[WeaponsStore.STATE_WEAPONS] = value;
        }
    },
    actions: {
    }
}