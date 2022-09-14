import { PrimogemsStore } from "@/Enums/StoreEnums";

export interface PrimogemsState {
    primogems: number
}

export default {
    state: (): PrimogemsState => ({
        [PrimogemsStore.STATE_PRIMOGEMS]: 1600,
    }),
    getters: {

    },
    mutations: {
        setPrimogems(state: PrimogemsState, value: number) {
            state[PrimogemsStore.STATE_PRIMOGEMS] = value;
        }
    },
    actions: {
    }
}