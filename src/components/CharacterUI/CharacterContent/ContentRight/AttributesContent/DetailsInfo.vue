<template>
    <div class="details-container">
        <div class="details-stats" v-for="value, key in stats" :key="key">
            <h2>{{key}}</h2>
            <div class="details-stats-stat-container">
                <div :class="['details-stats-stat', {white: index % 2 === 0, black: index % 2 !== 0}]"
                    v-for="stat, statKey, index in value.stat" :key="statKey">
                    <img :src="stat.icon ? useRequireImage(stat.icon) : useRequireImage('StatsIcons/empty.webp')" />
                    <h3>{{statKey}}</h3>
                    <p>{{stat.value}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useRequireImage from '@/Composables/useRequireImage';
interface Stat {
    stat: {
        [key: string]: {
            value: string,
            icon: string
        }
    }
}
interface Stats {
    'Base Stats': Stat,
    'Advanced Stats': Stat,
    'Elemental Type': Stat
}
const stats: Stats = {
    "Base Stats": {
        stat: {
            'Max HP': {
                value: '9,514',
                icon: 'StatsIcons/hp.webp'
            },
            "ATK": { value: '534', icon: 'StatsIcons/atk.webp' },
            "DEF": { value: '705', icon: 'StatsIcons/def.webp' },
            'Elementary Mastery': { value: '120', icon: 'StatsIcons/em.webp' },
            'Max Stamina': { value: '240', icon: 'StatsIcons/stamina.webp' }
        }
    },
    "Advanced Stats": {
        stat: {
            'CRIT Rate': { value: '5.0%', icon: 'StatsIcons/crit.webp' },
            'CRIT DMG': { value: '50.0%', icon: '' },
            'Healing Bonus': { value: '0.0%', icon: 'StatsIcons/healing_bonus.webp' },
            'Incoming Healing Bonus': { value: '0.0%', icon: '' },
            'Energy Recharge': { value: '100.0%', icon: 'StatsIcons/er.webp' },
            'CD Reduction': { value: '0.0%', icon: 'StatsIcons/cd_reduction.webp' },
            'Shield Strength': { value: '0.0%', icon: 'StatsIcons/shield_strength.webp' },
        }
    },
    "Elemental Type": {
        stat: {
            'Pyro DMG Bonus': { value: '0.0%', icon: 'StatsIcons/pyro.svg' },
            'Pyro RES': { value: '0.0%', icon: '' },
            'Hydro DMG Bonus': { value: '0.0%', icon: 'StatsIcons/hydro.svg' },
            'Hydro RES': { value: '0.0%', icon: '' },
            'Dendro DMG Bonus': { value: '0.0%', icon: 'StatsIcons/dendro.svg' },
            'Dendro RES': { value: '0.0%', icon: '' },
            'Electro DMG Bonus': { value: '0.0%', icon: 'StatsIcons/electro.svg' },
            'Electro RES': { value: '0.0%', icon: '' },
            'Anemo DMG Bonus': { value: '0.0%', icon: 'StatsIcons/anemo.svg' },
            'Anemo RES': { value: '0.0%', icon: '' },
            'Cryo DMG Bonus': { value: '0.0%', icon: 'StatsIcons/cryo.svg' },
            'Cryo RES': { value: '0.0%', icon: '' },
            'Geo DMG Bonus': { value: '0.0%', icon: 'StatsIcons/geo.svg' },
            'Geo RES': { value: '0.0%', icon: '' },
            'Physical DMG Bonus': { value: '0.0%', icon: 'StatsIcons/physical.svg' },
            'Physical RES': { value: '0.0%', icon: '' },
        }
    }
}
</script>

<style lang="scss">
.details-container {
    display: flex;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .details-stats {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;

        h2 {
            font-size: 19px;
            color: rgb(185, 185, 185);
        }

        .details-stats-stat-container {
            border-radius: 15px;

            .details-stats-stat {
                display: flex;
                padding: 7px;
                align-items: center;
                img{
                    width: 19px;
                    height: auto;
                    margin-right: 5px;
                    
                }

                &:first-child {
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                }

                &:last-child {
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }

                p {
                    margin-left: auto;
                    margin-right: 70px;
                }
            }

            .white {
                background-color: rgba(255, 255, 255, 0.055);
            }

            .black {
                background-color: rgba(0, 0, 0, 0.075);
            }
        }

    }
}
@media only screen and (orientation: portrait){
    .details-container {
        .details-stats {
            h2{
                font-size: 17px;
            }
            .details-stats-stat-container {
                .details-stats-stat {
                    h3{
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
@media only screen and (orientation: landscape) and (max-height: 820px){
    .details-container {
        .details-stats {
            h2{
                font-size: 17px;
            }
            .details-stats-stat-container {
                .details-stats-stat {
                    h3{
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>