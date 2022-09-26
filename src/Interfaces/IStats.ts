interface Stat {
    stat: {
        [key: string]: {
            value: string,
            icon: string
        }
    }
}
export interface IStats {
    'Base Stats': Stat,
    'Advanced Stats': Stat,
    'Elemental Type': Stat
}