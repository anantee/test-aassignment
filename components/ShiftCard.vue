<template>
	<div>
		<v-card class="mx-auto my-16">
			<div class="px-6 py-6">
				<div class="d-flex justify-space-between align-center">
					<div>
						<h2>{{ shift.title }}</h2>
						<p class="mt-2">{{ shift.description }}</p>
					</div>
					<div>
						<i @click="openEditBar"  class="fas fa-pencil-alt"></i>
					</div>
				</div>
				<div>
					<h2 class="mb-4">Dates</h2>
					<div>
						<v-card class="my-4 px-2 py-2 white--text" color="secondary" v-for="date in shift.dates" :key="date.date">
							<span class="mx-4">{{ changeDateFormat(date.date) }}</span>
							<span class="ml-12 mr-6">{{ date.startTime }}</span>
							<span class="mx-6">{{ date.endTime }}</span>
							<span class="ml-4">{{ date.type }}</span>
							<span class="float-right mr-8">€{{ date.price }}</span>
						</v-card>
					</div>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	name: "ShiftCard",
	props: {
		shift: {
			type: Object
		}
	},
	methods: {
		changeDateFormat(date) {
      return moment(date).format('DD MMM YYYY');
    },
		openEditBar() {
			this.$emit('openEditBar', this.shift);
		}
	}
};
</script>

<style scoped>
.fa-pencil-alt:hover {
	cursor: pointer;
	transform: scale(1.1);
}
</style>