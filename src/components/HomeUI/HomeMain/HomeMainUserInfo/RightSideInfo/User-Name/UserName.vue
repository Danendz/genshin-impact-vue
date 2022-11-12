<template>
	<figure class="home-menu__user-name">
		<figcaption>{{ props.user.username }}</figcaption>
		<button>
			<Icon icon="bxs:edit-alt" />
		</button>
	</figure>
</template>


<script setup lang="ts">
import { IUser } from '@/store/Home/UserData';
import { Icon } from '@iconify/vue';

const props = defineProps<{
	user: IUser
}>()

</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/RightSideInfo';

.home-menu__user-name {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: $backgroundGradient;

	figcaption {
		color: #e9e6e6 !important;
		font-weight: bold;
		font-size: 24px;
	}

	button {
		background-color: #ebe6d6;
		width: 25px;
		height: 25px;
		font-size: 20px;
		border-radius: 3px;

		&:active {
			opacity: 0.5;
		}
	}
}


@media only screen and (max-width: 915px) {
	.home-menu__user-name {
		figcaption {
			font-size: 14px !important;
		}

		button {
			width: 15px;
			height: 15px;
			font-size: 14px;
		}
	}
}
</style>