interface Stat {
    stat: {
        [key: string]: {
            value: string,
            icon: string
        }
    }
}
export interface IStats {
    'base-stats': Stat,
    'advanced-stats': Stat,
    'elemental-type': Stat
}