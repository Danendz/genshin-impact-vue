<template>
    <div class="characters-bottom">
        <div class="footer">
            <button><img />T</button>
        </div>
    </div>
</template>


<style lang="scss">
@import '@/assets/Styles/characters_panel';

.characters-bottom {
    left: 0;
    bottom: 10px;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: -9;
    padding: 5px;

    .footer {
        width: 55%;
        button {
            width: 30px;
            height: 30px;
        }
    }
}

@media only screen and (orientation: portrait) {
    .characters-bottom{
        display: none;
    }
}
@media only screen and (max-width: 915px) and (orientation: landscape) {
    .characters-bottom {
        .footer {
            width: 95%;
        }
    }
}
</style>