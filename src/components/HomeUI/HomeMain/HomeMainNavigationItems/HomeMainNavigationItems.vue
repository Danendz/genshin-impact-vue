<template>
	<section class="home-menu__navigation-container">
		<section class="home-menu__navigation-items">
			<figure class="home-menu__navigation-item" v-for="value, key in menu" :key="key"
				@click="goTo({ name: value.routeName ?? value.iconName })"
				:style="{ backgroundImage: `url(${HomeHelper.getHomeIcon(value.iconName)})` }">

				<figcaption>{{ t(`home.navigation-items.${key}`) }}</figcaption>
			</figure>
		</section>
		<button @click="switchLanguage">Switch language</button>
	</section>
</template>

<script setup lang="ts">
//helper
import HomeHelper from '@/helpers/HomeHelper';

//json
import home_menu from '@/assets/Data/home_menu.json'

//vue
import { useRouter } from 'vue-router';

//composables
import { useGetTranslator } from '@/Composables/useGetTranslator';
import { useGlobalLanguage } from '@/store/globalLanguage';
import { Languages } from '@/Enums/Languages';

interface IMenuItems {
	iconName: string,
	routeName?: string
}

interface IMenu {
	[name: string]: IMenuItems
}

const { t } = useGetTranslator()
const { setLanguage, getLanguage } = useGlobalLanguage()

const switchLanguage = () => {
	setLanguage(getLanguage.value === Languages.EN ? Languages.RU : Languages.EN)
}

const menu: IMenu = home_menu
const router = useRouter()


const goTo = (routeObj: { name: string }) => {
	if (router.hasRoute(routeObj.name)) {
		router.push(routeObj)
	}
}
</script>


<style lang="scss">
.home-menu {
	&__navigation-container {
		overflow-y: auto;
		overflow-x: hidden;

		.home-menu__navigation-items {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			padding: 15px;
			gap: 10px;
			user-select: none;

			.home-menu__navigation-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				text-align: center;
				position: relative;
				padding: 5px;
				height: 100px;
				background-color: #51586b;
				background-repeat: no-repeat;
				background-position: center 10px;
				background-size: 60px;
				cursor: pointer;
				transition: all .3s;
				transform: scale(1);

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					transition: .3s;
					opacity: 0;
					box-shadow: 0px 0px 5px 4px #f7e4ba;
				}

				&::after {
					content: '';
					position: absolute;
					top: 0;
					width: 10px;
					height: 10px;
					box-sizing: border-box;
					display: block;
					width: 10px;
					height: 10px;
					transform: rotate(135deg) scale(var(--ggs, 1));
					background: linear-gradient(45deg, transparent 50%, white 50%);
					border-radius: 2px;
					opacity: 0;

				}


				&:hover {
					transform: scale(1.05) translateZ(0);
				}

				&:hover::before {
					opacity: 1;
				}

				&:hover::after {
					opacity: 1;
					animation: HomeItemActive 1s infinite linear;
				}

				&:active {
					background-color: #faedd3;
				}

				&:active figcaption {
					color: #51586b;
				}

				figcaption {
					z-index: 2;
					color: #bdc1ca;
				}
			}
		}
	}
}

@keyframes HomeItemActive {
	0% {
		translate: 0 0px;
	}

	50% {
		translate: 0 3px;
	}

	100% {
		translate: 0 0px;
	}
}

@media only screen and (max-width: 915px) {
	.home-menu {
		&__navigation-container {
			.home-menu__navigation-items {
				padding: 7px 5px 10px 5px;

				gap: 5px;

				.home-menu__navigation-item {
					height: 70px;
					background-size: 40px;

					figcaption {
						font-size: 10px;
					}
				}
			}
		}
	}
}

@media only screen and (orientation: portrait) {
	.home-menu {
		&__navigation-container {
			display: flex;
			justify-content: center;

			align-items: center;
			width: 100%;

			.home-menu__navigation-items {
				max-width: 500px;
				padding: 10px;

				.home-menu__navigation-item {
					background-size: 40px;
					border-radius: 10px;
					background-color: #51586bc7;

					&::before {
						border-radius: 10px;
					}
				}
			}
		}
	}
}
</style>