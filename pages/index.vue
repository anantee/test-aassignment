<template>
  <div>
    <div>
      <TitleComponent title="Filter" />
      <div>
        <PriceFilterVue :priceRange="priceRange" @changePriceRange="changePriceRange" />
      </div>
    </div>
    <div>
      <div>
        <div>
          <TitleComponent title="Shifts" />
          <div class="float-right">
            <v-btn variant="flat" color="secondary" @click="openAddBar">
              Add Shift
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(shift, index) in shifts" :key="index">
        <ShiftCard :shift="shift" @openEditBar="openEditBar" />
      </div>
    </div>
    <div v-if="drawer">
      <div>
        <SideDrawer 
          :drawer="drawer"
          :selectedShift="selectedShift"
          @saveShift="saveShift"
          @cancel="cancel"
          @deleteShift="deleteShift" />
      </div>
    </div>
  </div>
</template>

<script>
import TitleComponent from '../components/TitleComponent.vue';
import PriceFilterVue from '../components/PriceFilter.vue';
import ShiftCard from '../components/ShiftCard.vue';
import SideDrawer from '../components/SideDrawer.vue';
export default {
  name: 'IndexPage',
  components: {
    TitleComponent,
    PriceFilterVue,
    ShiftCard,
    SideDrawer
  },
  data() {
    return {
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
      priceRange: [0, 70],
      drawer: false,
      selectedShift: {}
    }
  },
  methods: {
    changePriceRange(value) {
      this.priceRange = value;
    },
    openEditBar(shift) {
      // here while edit load to data to side bar component
      this.selectedShift = shift;
      this.drawer = !this.drawer;
    },
    openAddBar() {
      this.selectedShift = {};
      this.drawer = !this.drawer;
    },
    cancel() {
      this.drawer = false;
    },
    deleteShift(shift) {
      let isAnyShift = this.shifts.find(s => s.id === shift.id);
      const index = this.shifts.indexOf(isAnyShift);
      this.shifts.splice(index, 1);
      this.drawer = false;
    },
    saveShift(shift) {
      let isAnyShift = this.shifts.find(s => s.id === shift.id);
      if(!isAnyShift) {
        this.shifts.push(shift);
      }
      this.drawer = false;
    },
  }
}
</script>