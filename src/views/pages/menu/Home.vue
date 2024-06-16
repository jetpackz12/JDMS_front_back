<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Total Room Available</span
            >
            <div class="text-900 font-medium text-xl">152</div>
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
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Total Room Occupied</span
            >
            <div class="text-900 font-medium text-xl">152</div>
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
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Total Tenants</span>
            <div class="text-900 font-medium text-xl">28441</div>
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
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Total Guests</span>
            <div class="text-900 font-medium text-xl">152</div>
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
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Monthly Income Overview</h5>
        <Chart type="bar" :data="barData" :options="barOptions" />
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
      lineData: null,
      barData: null,
      lineOptions: null,
      barOptions: null,
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
  created() {
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
        ],
        datasets: [
          {
            label: "Last Year",
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-500"),
            borderColor: this.documentStyle.getPropertyValue("--primary-500"),
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "Current Year",
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-200"),
            borderColor: this.documentStyle.getPropertyValue("--primary-200"),
            data: [28, 48, 40, 19, 86, 27, 90],
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
        ],
        datasets: [
          {
            label: "Tenants",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor:
              this.documentStyle.getPropertyValue("--primary-500"),
            borderColor: this.documentStyle.getPropertyValue("--primary-500"),
            tension: 0.4,
          },
          {
            label: "Guests",
            data: [28, 48, 40, 19, 86, 27, 90],
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
  },
};
</script>

<style scoped></style>
