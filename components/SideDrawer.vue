<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			location="right"
			height="100%"
			width="450px"
			class="sidedrawer__position"
		>
			<v-main>
				<div class="px-4 py-6">
					<TitleComponent title="Create/Edit" />
					<div class="mt-6">
						<div class="mb-1">Title</div>
						<v-text-field
							label=""
							outlined
							placeholder=""
							v-model="currentshift.title"
						></v-text-field>
					</div>
					<div class="mt-2">
						<div class="mb-1">Description</div>
						<v-textarea label="" outlined v-model="currentshift.description"></v-textarea>
					</div>
					<div>
						<div class="mb-0">Dates</div>
						<MultiDatePicker :selectedDates="selectedShift.dates" @changeDates="changeDates" @validatationError="isDateValidation"/>
					</div>
					<div class="d-flex justify-space-around mt-4">
						<div>
							<v-btn v-if="Object.keys(this.selectedShift).length > 0" @click="deleteShift">
								Delete
							</v-btn>
							<v-btn @click="$emit('cancel')" v-else>
								Cancel
							</v-btn>
						</div>
						<div>
							<v-btn
								variant="flat"
								color="secondary"
								@click="saveData"
								:disabled="!currentshift.title || currentshift.dates.length <= 0 || isDateValid"
							>
								Save
							</v-btn>
						</div>
          			</div>
				</div>
			</v-main>
		</v-navigation-drawer>
	</div>
</template>

<script>
import TitleComponent from './TitleComponent.vue';
import MultiDatePicker from './MultiDatePicker.vue';
export default {
	name: "SideDrawer",
	props: {
		drawer: {
			type: Boolean,
			default: false
		},
		selectedShift: {
			type: Object
		}
	},
	components: {
		TitleComponent,
		MultiDatePicker
	},
	data() {
		return {
			currentshift: {
				id: Math.random().toString(36).replace('0.', 'id' || ''),
				title: "",
				description: "",
				dates: []
			},
			isDateValid: false
		}
	},
	methods: {
		changeDates(dates) {
			this.currentshift.dates = dates;
		},
		saveData() {
			this.$emit('saveShift', this.currentshift);
		},
		deleteShift() {
			if (confirm("Are you Sure you want to delete ?") == true) {
				this.$emit('deleteShift', this.currentshift);
			} else {
				this.$emit('cancel');
			}
		},
		isDateValidation(value) {
			if (value) {
				this.isDateValid = true;
			} else {
				this.isDateValid = false;
			}
		}
	},
	mounted() {
		if (Object.keys(this.selectedShift).length > 0) {
			this.currentshift = this.selectedShift;
		}
	}
};
</script>

<style>
.sidedrawer__position {
  position: absolute;
  top: 0px;
  right: 0px;
  left: unset;
  box-shadow: 5px 10px 8px 10px rgba(0, 0, 0, 0.3);
}
</style>