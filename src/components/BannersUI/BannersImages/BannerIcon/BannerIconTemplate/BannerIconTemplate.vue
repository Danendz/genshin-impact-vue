<template>
	<figure @click="setActive"
		:class="['banners-sm__banner', { 'banners-sm__banner_active': props.activeBannerImage === index }, {'banners-sm__standard-fix': isStandard}]">

		<img v-if="typeof url === 'string'" draggable="false" alt="mini-item" :src="url" />

		<section class="banners-sm__images" v-if="typeof url === 'object'">
			<img draggable="false" alt="mini-item" v-for="urls, index in url" :src="urls" :key="index" />
		</section>

		<div class="banners-sm__outer-border"></div>
		<div class="banners-sm__inner-border"></div>
		<section class="banners-sm__icons">
			<i class="gi-primo-star" />
			<i class="gi-companion" />
		</section>
	</figure>
</template>


<script setup lang="ts">
import { BannerTypes } from '@/Enums/WishEnums';

import { useActiveBanner } from '@/store/Gacha/activeBanner';

interface Props {
	index: number,
	activeBannerImage: number,
	eventCharacterIndex?: number,
	bannerType: BannerTypes,
	isStandard?: boolean,
	url: string | string[]

}

const props = defineProps<Props>()
const { setActiveBannerImage, setActiveBannerWish } = useActiveBanner()

function setActive(): void {
	if (props.bannerType === BannerTypes.EVENT && props.eventCharacterIndex === undefined) throw new Error("Вы не указали ивентовый индекс для персонажа!")
	setActiveBannerWish([props.bannerType, props.eventCharacterIndex])
	setActiveBannerImage(props.index)
}


</script>


<style lang="scss">
.banners-sm__banner {
	position: relative;
	width: 150px;
	height: 75px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 5px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;

	.banners-sm__images {
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 50%;
			transform: scale(1) translateY(-14%);
		}
	}

	img {
		width: 100%;
		height: fit-content;
		transform: scale(1.5) translateY(16%);
		transition: .2s;
	}

	&::before {
		content: '';
		width: 100%;
		height: 65%;
		position: absolute;
		background-color: #4a6995;
		border-radius: 5px;
		left: 0;
		bottom: 0;
		z-index: -1;
		transition: .3s;
	}

	&::after {
		content: '';
		width: 100%;
		height: 8%;
		position: absolute;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		bottom: 0;
		left: 0;
		transition: .3s;
		background: linear-gradient(to top, #f2e8cf 0%, #f2e8cfbd 40%, #f2e8cf3f 80%, transparent 100%);
		opacity: 0;
	}

	.banners-sm__inner-border,
	.banners-sm__outer-border {
		position: absolute;
		width: 100%;
		height: 65%;
		z-index: -1;
		left: 0;
		bottom: 0;
		transform: scaleX(0.97) scaleY(0.92);
		border-radius: 5px;
		border: 1.5px solid rgba(255, 255, 255, 0.288);
	}

	.banners-sm__inner-border {
		border-radius: 50px;
	}

	.banners-sm__icons {
		width: 100%;
		height: 65%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		bottom: 0;
		left: 0;

		i {
			line-height: 0;
			color: rgba(255, 255, 255, 0.11);
		}

		.gi-primo-star {
			font-size: 18px;
			margin-left: 10px;
		}

		.gi-companion {
			font-size: 50px;
			margin-right: 5px;
		}
	}

	&:hover {
		.banners-sm__images {
			img {
				transform: scale(1) translateY(-16%);
			}
		}

		img {
			transform: scale(1.5) translateY(15%)
		}
	}


	&_active {
		.banners-sm__images {
			img {
				transform: scale(1) translateY(-18%) !important;
			}
		}

		img {
			transform: scale(1.5) translateY(14%) !important;
		}

		&::before {
			background-color: #f2e8cf;
		}

		&::after {
			opacity: 1;
		}
	}
}

.banners-sm__standard-fix {
	img {
		transform: scale(2.2) translateY(6%);
	}

	&:hover {
		img {
			transform: scale(2.2) translateY(5%);
		}
	}

	&.banners-sm__banner_active {
		img {
			transform: scale(2.2) translateY(4%) !important;
		}
	}
}


@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.banners-sm__banner {
		width: 120px;
		height: 60px;

		&::before {
			height: 90%;
		}

		.banners-sm__icons {
			height: 90%;
		}

		.banners-sm__inner-border,
		.banners-sm__outer-border {
			height: 90%;
		}

		.banners-sm__images {
			img {
				transform: scale(1) translateY(-22%);
			}
		}

		&_active {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-24%) !important;
				}
			}
		}
	}
}


@media only screen and (orientation: portrait) {
	.banners-sm__banner {
		height: 10vw;
		min-height: 60px;
		max-height: 90px;

		.banners-sm__images {
			img {
				transform: scale(1) translateY(-5%);
			}
		}

		&:hover {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-6.5%);
				}
			}
		}

		&_active {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-8%) !important;
				}
			}
		}
	}
}

@media only screen and (orientation: portrait) and (max-width: 1200px) {
	.banners-sm__banner {
		.banners-sm__images {
			img {
				transform: scale(1) translateY(-10%);
			}
		}

		&:hover {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-12.5%);
				}
			}
		}

		&_active {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-13%) !important;
				}
			}
		}
	}
}

@media only screen and (orientation: portrait) and (max-width: 375px) {
	.banners-sm__banner {
		.banners-sm__images {
			img {
				transform: scale(1) translateY(0%);
			}
		}

		&:hover {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-1%);
				}
			}
		}

		&_active {
			.banners-sm__images {
				img {
					transform: scale(1) translateY(-2%) !important;
				}
			}
		}
	}
}
</style>