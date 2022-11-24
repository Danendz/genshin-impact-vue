<template>
	<section class="wish-info">
		<i class="gi-primo-star" />
		<p>Wish</p>
	</section>
</template>




<style lang="scss">
.wish-info {
	display: flex;
	align-items: center;
	top: 10px;
	left: 10px;
	gap: 30px;

	p {
		color: white;

		font-size: 20px;
	}

	i {
		color: #dcb884;
		font-size: 40px;
		line-height: 0;
	}
}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.wish-info {
		display: none;
	}
}

@media only screen and (orientation: portrait) {
	.wish-info {
		gap: 15px;

	}
}
</style>