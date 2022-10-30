<template>
	<ModalWindow class="banners-not-enough-money" :modal-style="'default'" :active_state="getIsNotEnough">
		<div class="banners-not-enough-money__content">
			<h2>Не достаточно средств на счету!</h2>
		</div>
	</ModalWindow>
</template>


<script setup lang="ts">
import ModalWindow from '@/components/UI/ModalWindow.vue';
import { useNotEnoughFunds } from '@/store/Gacha/notEnoughFunds';
import { watch } from 'vue';

const { getIsNotEnough, setIsNotEnough } = useNotEnoughFunds()

watch(getIsNotEnough, () => {
	if (getIsNotEnough.value) {
		setTimeout(() => {
			setIsNotEnough(false)
		}, 1500);
	}

})

</script>


<style lang="scss">
.banners-not-enough-money {
	background-color: rgba(0, 0, 0, 0.192);


	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		width: 360px;
		height: 80px;
		border-radius: 15px;
		font-size: 16px;
		user-select: none;
	}
}

@media only screen and (max-width: 915px) {
	.banners-not-enough-money {
		&__content {
			font-size: 13px;
			width: 320px;
			height: 50px;
		}
	}
}
</style>