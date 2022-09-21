<template>
    <div class="stats-bar">
        <div class="stat">
            <img />
            <span>Max Hp</span>
            <span class="stat-value">15,033</span>
        </div>
        <div class="stat">
            <img />
            <span>Max Hp</span>
            <span class="stat-value">15,033</span>
        </div>
        <div class="stat">
            <img />
            <span>Max Hp</span>
            <span class="stat-value">15,033</span>
        </div>
        <div class="stat">
            <img />
            <span>Max Hp</span>
            <span class="stat-value">15,033</span>
        </div>
        <div class="stat">
            <img />
            <span>Max Hp</span>
            <span class="stat-value">15,033</span>
        </div>
    </div>
</template>

<style lang="scss">
.attributes-content {
    .stats-bar {
        width: 100%;

        .stat {
            display: flex;
            margin: 2px 0;
            font-weight: bold;
            padding: 5px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.322);

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
                padding: 3px 4px;
                font-size: 12px;
            }
        }
    }
}
</style>