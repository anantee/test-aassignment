<template>
	<div class="d-flex py-8">
		<div class="label__width">Filter on price</div>
		<div class="slider__container">
			<div class="slider__box">
				<v-range-slider
					v-model="value"
					strict
					min="0"
					max="500"
					step="10"
					thumb-label="always"
					track-color="grey"
					thumb-color="#db7093"
				></v-range-slider>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PriceFilter',
	props: {
		priceRange: {
			type: Array
		}
	},
	data() {
		return {
			value: [0, 70]
		}
	},
	watch: {
		value(newValue) {
			this.$emit("changePriceRange", newValue);
		}
	},
	beforeMount() {
		if (this.priceRange && this.priceRange.length > 1) {
			this.value = this.priceRange;
		}
	}
};
</script>

<style>
.label__width {
	width: 20%
}
.slider__container {
	width: 100%
}
.slider__box {
	width: 50%;
}
</style>