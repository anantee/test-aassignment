export const state = () => ({
	shifts: [
		{
			id: 1,
			title: "Shift 1",
			description: "This is shift is...",
			dates: [
				{
					date: "2022-05-05",
					startTime: "09:00",
					endTime: "17:00",
					type: "Consultation",
					price: 70
				},
				{
					date: "2022-05-06",
					startTime: "08:00",
					endTime: "20:00",
					type: "Telephone",
					price: 50
				},
				{
					date: "2022-05-07",
					startTime: "10:00",
					endTime: "22:00",
					type: "Ambulance",
					price: 100
				}
			]
		},
		{
			id: 2,
			title: "Shift 2",
			description: "This is shift is...",
			dates: [
				{
					date: "2022-07-07",
					startTime: "09:00",
					endTime: "16:00",
					type: "Telephone",
					price: 80
				},
				{
					date: "2022-07-08",
					startTime: "10:00",
					endTime: "21:00",
					type: "Ambulance",
					price: 60
				},
				{
					date: "2022-07-09",
					startTime: "11:00",
					endTime: "23:00",
					type: "Consultation",
					price: 95
				}
			]
		}
	],
})

export const mutations = {
	DELETE_SHIFT(state, index) {
		state.shifts.splice(index, 1);
	},
	SAVE_SHIFT(state, shift) {
		state.shifts.push(shift);
	},
	ADD_DATES(state,  selectedShift, dates) {
		const shift = state.shifts.find(shift => selectedShift.id === shift.id);
		const index = state.shifts.indexOf(shift);
		commit('DELETE_SHIFT', index);
		let newShift = {...selectedShift, ...dates}
		commit('SAVE_SHIFT', newShift);
	}
}

export const actions = {
	
}

export const getters = {}