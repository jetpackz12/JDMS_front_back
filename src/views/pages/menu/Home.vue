<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <Skeleton v-if="isShowLoading" height="5rem"></Skeleton>
        <div v-else class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Total Room Vacant</span
            >
            <div class="text-900 font-medium text-xl">
              {{ renderData.vacantRooms }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-building text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <Skeleton v-if="isShowLoading" height="5rem"></Skeleton>
        <div v-else class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Total Room Occupied</span
            >
            <div class="text-900 font-medium text-xl">
              {{ renderData.occupiedRooms }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-lock text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <Skeleton v-if="isShowLoading" height="5rem"></Skeleton>
        <div v-else class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Total Tenants</span>
            <div class="text-900 font-medium text-xl">
              {{ renderData.totalTenants }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <Skeleton v-if="isShowLoading" height="5rem"></Skeleton>
        <div v-else class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Total Guests</span>
            <div class="text-900 font-medium text-xl">
              {{ renderData.totalGuests }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Customer Overview</h5>
        <Skeleton v-if="isShowLoading" height="25rem"></Skeleton>
        <Chart v-else type="line" :data="lineData" :options="lineOptions" />
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Monthly Income Overview</h5>
        <Skeleton v-if="isShowLoading" height="25rem"></Skeleton>
        <Chart v-else type="bar" :data="barData" :options="barOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import { useLayout } from "@/layout/composables/layout";

export default {
  data() {
    return {
      renderData: {
        vacantRooms: 0,
        occupiedRooms: 0,
        totalTenants: 0,
        totalGuests: 0,
        tenants: [],
        guests: [],
        waterBillingPayment: [],
        electricityBillingPayment: [],
      },
      lineData: null,
      barData: null,
      lineOptions: null,
      barOptions: null,
      isShowLoading: true,
      layoutConfig: useLayout().layoutConfig,
      documentStyle: getComputedStyle(document.documentElement),
      textColor: getComputedStyle(document.documentElement).getPropertyValue(
        "--text-color"
      ),
      textColorSecondary: getComputedStyle(
        document.documentElement
      ).getPropertyValue("--text-color-secondary"),
      surfaceBorder: getComputedStyle(
        document.documentElement
      ).getPropertyValue("--surface-border"),
    };
  },
  methods: {
    setColorOptions() {
      this.documentStyle = getComputedStyle(document.documentElement);
      this.textColor = this.documentStyle.getPropertyValue("--text-color");
      this.textColorSecondary = this.documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      this.surfaceBorder =
        this.documentStyle.getPropertyValue("--surface-border");
    },
    setChart() {
      this.barData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Water Billing Payment",
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-200"),
            borderColor: this.documentStyle.getPropertyValue("--primary-200"),
            data: this.renderData.waterBillingPayment,
          },
          {
            label: "Electricity Billing Payment",
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-400"),
            borderColor: this.documentStyle.getPropertyValue("--primary-400"),
            data: this.renderData.electricityBillingPayment,
          },
        ],
      };

      this.barOptions = {
        plugins: {
          legend: {
            labels: {
              fontColor: this.textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: this.textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: this.textColorSecondary,
            },
            grid: {
              color: this.surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };

      this.lineData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Tenants",
            data: this.renderData.tenants,
            fill: false,
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-500"),
            borderColor: this.documentStyle.getPropertyValue("--primary-500"),
            tension: 0.4,
          },
          {
            label: "Guests",
            data: this.renderData.guests,
            fill: false,
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-200"),
            borderColor: this.documentStyle.getPropertyValue("--primary-200"),
            tension: 0.4,
          },
        ],
      };

      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              fontColor: this.textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: this.textColorSecondary,
            },
            grid: {
              color: this.surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: this.textColorSecondary,
            },
            grid: {
              color: this.surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    },
    async getHomeData() {
      await this.$store.dispatch("homeModule/getHomeData");

      this.renderData.vacantRooms = this.getData.vacantRooms;
      this.renderData.occupiedRooms = this.getData.occupiedRooms;
      this.renderData.totalTenants = this.getData.totalTenants;
      this.renderData.totalGuests = this.getData.totalGuests;

      this.renderData.tenants = this.getData.tenants.reduce((acc, item) => {
        const createdDate = new Date(item.created_at);
        const month = createdDate.getMonth();
        acc[month]++;
        return acc;
      }, Array(12).fill(0));

      this.renderData.guests = this.getData.guests.reduce((acc, item) => {
        const createdDate = new Date(item.created_at);
        const month = createdDate.getMonth();
        acc[month]++;
        return acc;
      }, Array(12).fill(0));

      this.renderData.waterBillingPayment = this.getData.waterBillingPayment.reduce((acc, item) => {
        const createdDate = new Date(item.created_at);
        const month = createdDate.getMonth();
        acc[month] += parseInt(item.amount);
        return acc;
      }, Array(12).fill(0));

      this.renderData.electricityBillingPayment = this.getData.electricityBillingPayment.reduce((acc, item) => {
        const createdDate = new Date(item.created_at);
        const month = createdDate.getMonth();
        acc[month] += parseInt(item.amount);
        return acc;
      }, Array(12).fill(0));

      if (this.isSuccess) {
        this.isShowLoading = false;
        this.setColorOptions();
        this.setChart();

        watch(
          () => this.layoutConfig.theme,
          () => {
            this.setColorOptions();
            this.setChart();
          },
          { immediate: true }
        );
      }
    },
  },
  computed: {
    getData() {
      return this.$store.getters["homeModule/data"];
    },
    isSuccess() {
      return this.$store.getters["homeModule/isSuccess"];
    },
  },
  mounted() {
    this.getHomeData();
  },
};
</script>

<style scoped></style>
