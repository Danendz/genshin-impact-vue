<template>
	<section class="home-settings-container">
		<slot />
	</section>
</template>


<style lang="scss">
.home-settings-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: 100%;
}
</style>