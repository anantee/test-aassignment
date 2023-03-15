<template>
	<div>
		<v-layout>
			<v-menu
				ref="menu"
				v-model="menu"
				:close-on-content-click="false"
				:nudge-right="40"
				:return-value.sync="dates"
				transition="scale-transition"
				offset-y
				min-width="290px"
				class="px-4"
			>
				<template v-slot:activator="{ on }">
					<v-combobox
						v-model="dates"
						multiple
						chips
						small-chips
						readonly
						v-on="on"
					></v-combobox>
				</template>
				<v-date-picker v-model="dates" multiple no-title scrollable>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
					<v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
				</v-date-picker>
			</v-menu>
		</v-layout>
		<div v-if="changedDates.length > 0">
			<div v-for="(date, index) in changedDates" :key="index">
				<p class="mb-4">{{ formattedDate(date.date) }}</p>
				<v-card class="my-4 px-2 py-2 white--text" color="secondary">
					<div class="d-flex">
						<div>
							<p>Starttime</p>
							<input type="time" class="time__picker" :style="`${date.startTime > date.endTime && 'border: 2px solid red'}`" v-model="date.startTime">
						</div>
						<div>
							<p>Endtime</p>
							<input type="time" class="time__picker" :style="`${date.startTime > date.endTime && 'border: 2px solid red'}`" v-model="date.endTime">
						</div>
						<div>
							<p>Price</p>
							<input type="number" min="0" class="time__picker mr-0 px-1" v-model="date.price">
						</div>
					</div>
					<div class="mt-4">
						<div>
							<div>Type</div>
							<v-select
								v-model="date.type"
								:items="typeOptions"
								label="Type"
								persistent-hint
								return-object
								single-line
								background-color="white"
								:style="`${!date.type && 'border: 2px solid red'}`"
							></v-select>
							<div v-if="!date.type">
								<i class="red--text">Type must have a value </i>
							</div>
						</div>
					</div>
					<div v-if="date.startTime > date.endTime">
						<i class="red--text">Start Time can not be greater than End time</i>
					</div>
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	name: 'MultiDatePicker',
	props: {
		selectedDates: {
			type: Array
		}
	},
	data: () => ({
		dates: [],
		changedDates: [],
		menu: false,
		typeOptions: ['Consultation', 'Telephone', 'Ambulance']
	}),
	methods: {
		formattedDate(date) {
			return moment(date).format('DD-MM-YYYY')
		}
	},
	watch: {
		dates() {
			if (this.dates.length > 0) {
				let changedDates = this.changedDates;
				this.changedDates = [];
				this.dates.filter(date => {
					let existingDate = changedDates.find(d => d.date === date)
					let changedDate = {
						date: date,
						startTime: "00:00",
						endTime: "01:00",
						type: "",
						price: 0
					}
					if (existingDate && Object.keys(existingDate).length > 0) {
						this.changedDates.push(existingDate)
					} else {
						this.changedDates.push(changedDate);
					}
				})
			}
		},
		changedDates: {
			deep: true,
			handler() {
				this.$emit('changeDates', this.changedDates);
				let isValidationError = this.changedDates && this.changedDates.some(date => date.startTime > date.endTime || !date.type)
				this.$emit('validatationError', isValidationError);
			}
		},
	},
	mounted() {
		if (!!this.selectedDates && this.selectedDates.length > 0) {
			this.changedDates = this.selectedDates;
			this.dates = this.changedDates.map(date => date.date)
		}
	}
}
</script>

<style scoped>
.time__picker {
	background-color: white;
	margin-right: 12px;
}
</style>