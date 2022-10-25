<template>
    <section class="stats-bar">
        <figure class="stat" v-for="value, key in stats['Base Stats'].stat" :key="key">
            <img :alt='`${key}`' :src="CharacterHelper.getGenshinSiteIcons(value.icon)" />
            <figcaption>{{ key }}</figcaption>
            <figcaption class="stat-value">{{ value.value }}</figcaption>
        </figure>
    </section>
</template>

<script setup lang="ts">
//interfaces
import { IStats } from '@/Interfaces/IStats';

//Data
import statsData from '@/assets/Data/stats.json'
import CharacterHelper from '@/helpers/CharacterHelper';

const stats: IStats = statsData;

</script>

<style lang="scss">
.stats-bar {
    width: 100%;

    .stat {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        padding: 5px;
        border-radius: 5px;

        img {
            width: 12px;
            height: auto;
            margin-right: 3px;
        }

        .stat-value {
            margin-left: auto;
        }
    }
}

@media only screen and (orientation: portrait) {
    .stats-bar {
        .stat {
            font-size: 14px;
        }
    }

}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .stats-bar {
        .stat {
            padding: 2px 4px;
            font-size: 11px;
        }
    }
}
</style>