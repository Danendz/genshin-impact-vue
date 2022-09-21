<template>
    <div class="details-container">
        <div class="details-stats" v-for="value, key in stats" :key="key">
            <h2>{{key}}</h2>
            <div class="details-stats-stat-container">
                <div :class="['details-stats-stat', {white: index % 2 === 0, black: index % 2 !== 0}]"
                    v-for="stat, statKey, index in value.stat" :key="statKey">
                    <img :src="stat.icon" />
                    <h3>{{statKey}}</h3>
                    <p>{{stat.value}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
                icon: ''
            },
            "ATK": { value: '534', icon: '' },
            "DEF": { value: '705', icon: '' },
            'Elementary Mastery': { value: '120', icon: '' },
            'Max Stamina': { value: '240', icon: '' }
        }
    },
    "Advanced Stats": {
        stat: {
            'CRIT Rate': { value: '5.0%', icon: '' },
            'CRIT DMG': { value: '50.0%', icon: '' },
            'Healing Bonus': { value: '0.0%', icon: '' },
            'Incoming Healing Bonus': { value: '0.0%', icon: '' },
            'Energy Recharge': { value: '100.0%', icon: '' },
            'CD Reduction': { value: '0.0%', icon: '' },
            'Shield Strength': { value: '0.0%', icon: '' },
        }
    },
    "Elemental Type": {
        stat: {
            'Pyro DMG Bonus': { value: '0.0%', icon: '' },
            'Pyro RES': { value: '0.0%', icon: '' },
            'Hydro DMG Bonus': { value: '0.0%', icon: '' },
            'Hydro RES': { value: '0.0%', icon: '' },
            'Dendro DMG Bonus': { value: '0.0%', icon: '' },
            'Dendro RES': { value: '0.0%', icon: '' },
            'Electro DMG Bonus': { value: '0.0%', icon: '' },
            'Electro RES': { value: '0.0%', icon: '' },
            'Anemo DMG Bonus': { value: '0.0%', icon: '' },
            'Anemo RES': { value: '0.0%', icon: '' },
            'Cryo DMG Bonus': { value: '0.0%', icon: '' },
            'Cryo RES': { value: '0.0%', icon: '' },
            'Geo DMG Bonus': { value: '0.0%', icon: '' },
            'Geo RES': { value: '0.0%', icon: '' },
            'Physical DMG Bonus': { value: '0.0%', icon: '' },
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