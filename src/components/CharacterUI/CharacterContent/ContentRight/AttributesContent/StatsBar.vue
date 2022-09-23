<template>
    <div class="stats-bar">
        <div class="stat">
            <img alt='max-hp' src="@/assets/StatsIcons/hp.webp"/>
            <span>Max Hp</span>
            <span class="stat-value">15,033</span>
        </div>
        <div class="stat">
            <img alt='atk' src="@/assets/StatsIcons/atk.webp" />
            <span>ATK</span>
            <span class="stat-value">2,416</span>
        </div>
        <div class="stat">
            <img alt='def' src="@/assets/StatsIcons/def.webp" />
            <span>DEF</span>
            <span class="stat-value">891</span>
        </div>
        <div class="stat">
            <img alt="elemental mastery" src="@/assets/StatsIcons/em.webp" />
            <span>Elemental Mastery</span>
            <span class="stat-value">0</span>
        </div>
        <div class="stat">
            <img src='@/assets/StatsIcons/stamina.webp' />
            <span>Max Stamina</span>
            <span class="stat-value">244</span>
        </div>
    </div>
</template>

<style lang="scss">
.attributes-content {
    .stats-bar {
        width: 100%;

        .stat {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            padding: 5px;
            border-radius: 5px;
            img{
                width: 12px;
                height: auto;
                margin-right: 3px;
            }
            .stat-value {
                margin-left: auto;
            }
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .attributes-content {
        .stats-bar {
            .stat {
                padding: 2px 4px;
                font-size: 11px;
            }
        }
    }
}
</style>