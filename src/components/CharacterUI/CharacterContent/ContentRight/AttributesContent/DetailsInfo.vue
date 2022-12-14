<template>
    <section class="details-container">
        <section class="details-stats" v-for="value, key in stats" :key="key">
            <summary>{{ t(`characters.stats.${key}`) }}</summary>
            <article class="details-stats-stat-container">
                <figure :class="['details-stats-stat', { white: index % 2 === 0, black: index % 2 !== 0 }]"
                    v-for="stat, statKey, index in value.stat" :key="statKey">

                    <LazyImg :options="{
                        src: stat.icon
                            ? CharacterHelper.getGenshinSiteIcons(stat.icon)
                            : CharacterHelper.getGenshinSiteIcons('stats-icons/empty'),
                        alt: stat.value
                    }" />
                    <h3>{{ t(`characters.stats.${statKey}`) }}</h3>
                    <figcaption>{{ stat.value }}</figcaption>

                </figure>
            </article>
        </section>
    </section>
</template>

<script setup lang="ts">
//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//data
import statsData from '@/assets/Data/stats.json'

//components
import LazyImg from '@/components/UI/Lazy-Img.vue';

//interfaces
import { IStats } from '@/Interfaces/IStats'

//composables
import { useGetTranslator } from '@/Composables/useGetTranslator';

const { t } = useGetTranslator()

const stats: IStats = statsData;
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

        summary {
            font-size: 17px;
            font-family: Genshin, Arial, Helvetica, sans-serif;
            color: rgb(185, 185, 185);
        }

        .details-stats-stat-container {
            border-radius: 15px;

            .details-stats-stat {
                display: flex;
                padding: 7px;
                align-items: center;

                img {
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

                h3 {
                    font-size: 16px;
                }

                figcaption {
                    margin-left: auto;
                    font-size: 16px;
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

@media only screen and (orientation: portrait) {
    .details-container {
        .details-stats {
            summary {
                font-size: 12px;
            }

            .details-stats-stat-container {
                .details-stats-stat {
                    img {
                        width: 16px;
                    }

                    h3 {
                        font-size: 11px;
                    }

                    figcaption {
                        font-size: 11px;
                    }
                }
            }
        }
    }
}

@media only screen and (orientation: landscape) and (max-height: 820px) {
    .details-container {
        .details-stats {
            summary {
                font-size: 15px;
            }

            .details-stats-stat-container {
                .details-stats-stat {
                    h3 {
                        font-size: 13px;
                    }

                    figcaption {
                        font-size: 13px;
                    }
                }
            }
        }
    }
}
</style>