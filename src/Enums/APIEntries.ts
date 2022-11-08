interface IAPIEntries {
    BASE_URL: 'http://localhost:5000' | 'https://genshin-api-vue.herokuapp.com',
    WEAPONS: '/weapons/',
    CHARACTERS: '/characters/',
    ELEMENTS: '/elements/',
    GENSHIN_SITE: '/genshin-site/',
    BANNERS: '/banners/',
    WEAPONS_WISH_ICONS: '/wish-weapons-icons/',
    HOME_ICONS: '/home-icons/',
    HOME_BACKGROUNDS: '/home-backgrounds/'
}

export const APIEntries: IAPIEntries = {
    BASE_URL: process.env.VUE_APP_SERVER,
    WEAPONS: '/weapons/',
    CHARACTERS: '/characters/',
    ELEMENTS: '/elements/',
    GENSHIN_SITE: '/genshin-site/',
    BANNERS: '/banners/',
    WEAPONS_WISH_ICONS: '/wish-weapons-icons/',
    HOME_ICONS: '/home-icons/',
    HOME_BACKGROUNDS: '/home-backgrounds/'
}