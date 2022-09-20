<template>
    <aside class="rightContent">
        <div class="base-info">
            <h1 class="name">Ganyu <span class="rarity">*****</span></h1>

            <p class="base-lvl">Level 90 / <span class="max-lvl">90</span></p>
            <progress class="lvl-progress" value="100" max="100" />
        </div>
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
        <button class="details-btn">Details</button>
        <div class="friendship">
            <img />
            <span>Friendship</span>
            <span class="friendship-lvl">8</span>
        </div>
        <progress class="friendship-progress" value="90" max="100" />
        <p class="content-right-description">
            descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription
        </p>
    </aside>
</template>


<style lang="scss">
.rightContent {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;


    .lvl-progress,
    .friendship-progress {
        border-radius: 7px;
        width: 100%;
        height: 5px;
        margin-top: 2px;
        display: block;
    }

    .lvl-progress::-webkit-progress-bar,
    .friendship-progress::-webkit-progress-bar {
        background-color: rgba(0, 0, 0, 0.486);
        border-radius: 10px;
    }

    .lvl-progress::-webkit-progress-value {
        background-color: #3ed2ff;
        border-radius: 10px;
    }

    .friendship-progress::-webkit-progress-value {
        background-color: #fc8ef3;
        border-radius: 10px;
    }

    progress::-moz-progress-bar {
        /* style rules */
    }

    .base-info {
        .name {
            display: flex;
            flex-direction: column;
            font-size: 30px;
            font-weight: bold;
        }

        .base-lvl {
            font-size: 22px;

            .max-lvl {
                color: rgb(185, 185, 185);
            }
        }
    }

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

    .details-btn {
        border: 0;
        padding: 8px;
        color: white;
        font-size: 16px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.192);
        transition: .3s;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.192);
        }
    }

    .friendship {
        display: flex;
        font-size: 17px;

        .friendship-lvl {
            margin-left: auto;
        }
    }

    .content-right-description {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100px;
        font-size: 17px;
        word-break: break-word;
    }
}

@media only screen and (max-width: 700px) and (orientation: portrait) {
    .rightContent {
        width: 85%;

        background-color: rgba(0, 0, 0, 0.295);
        padding: 10px;
        border-radius: 10px;

        .content-right-description {
            font-size: 20px;
            max-height: 150px;
        }
    }
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
    .rightContent {
        width: 200px;
        gap: 5px;

        .base-info {
            .name {
                font-size: 20px;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .base-lvl {
                font-size: 16px;
            }
        }

        .stats-bar {
            .stat {
                padding: 3px 4px;
                font-size: 12px;
            }
        }

        .details-btn {
            font-size: 15px;
            padding: 2px;
        }

        .friendship {
            font-size: 15px;
        }

        .content-right-description {
            font-size: 15px;
            max-height: 60px;
        }
    }
}
</style>