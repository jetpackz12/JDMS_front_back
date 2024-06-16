<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div v-if="isShowLoading">
          <Skeleton class="col-12" height="80px"></Skeleton>
          <Skeleton class="col-12 mt-2" height="300px"></Skeleton>
        </div>

        <div v-else>
          <TableToolKit
            :hasDelete="hasDelete"
            :hasFilter="!hasDelete"
            @openNew="openAddDialog"
            @filter="openFilterDialog"
            @print="printTable"
            @excel="exportCSV"
            @pdf="exportPDF"
          />

          <div id="printable" class="card hidden">
            <DataTable :value="datas" tableStyle="min-width: 20rem">
              <Column field="room" header="Room"></Column>
              <Column field="tenant" header="Tenant"></Column>
              <Column field="prev_read" header="Previous Reading"></Column>
              <Column field="pres_read" header="Present Reading"></Column>
              <Column field="amount" header="Amount"></Column>
              <Column field="due_date" header="Due Date"></Column>
              <Column field="date_issue" header="Date Issue"></Column>
            </DataTable>
          </div>

          <DataTable
            ref="dt"
            :value="datas"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} water billing payments"
          >
            <template #header>
              <div
                class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
              >
                <h5 class="m-0">Manage Water Billing Payments</h5>
                <IconField iconPosition="left" class="block mt-2 md:mt-0">
                  <InputIcon class="pi pi-search" />
                  <InputText
                    class="w-full sm:w-auto"
                    v-model="filters['global'].value"
                    placeholder="Search..."
                  />
                </IconField>
              </div>
            </template>

            <Column
              field="room"
              header="Room"
              :sortable="true"
              headerStyle="width:14%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Room</span>
                {{ slotProps.data.room }}
              </template>
            </Column>
            <Column
              field="tenant"
              header="Tenant"
              :sortable="true"
              headerStyle="width:14%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Tenant</span>
                {{ slotProps.data.tenant }}
              </template>
            </Column>
            <Column
              field="prev_read"
              header="Previous Reading"
              :sortable="true"
              headerStyle="width:14%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Previous Reading</span>
                {{ slotProps.data.prev_read }}
              </template>
            </Column>
            <Column
              field="pres_read"
              header="Present Reading"
              :sortable="true"
              headerStyle="width:14%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Present Reading</span>
                {{ slotProps.data.pres_read }}
              </template>
            </Column>
            <Column
              field="amount"
              header="Amount"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Amount</span>
                {{ formatCurrency(slotProps.data.amount) }}
              </template>
            </Column>
            <Column
              field="due_date"
              header="Due Date"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Due Date</span>
                {{ slotProps.data.due_date }}
              </template>
            </Column>
            <Column
              field="date_issue"
              header="Date Issue"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Date Issue</span>
                {{ slotProps.data.date_issue }}
              </template>
            </Column>
            <Column headerStyle="min-width:10rem;">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="ml-5"
                  severity="success"
                  rounded
                  @click="openUpdateDialog(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Dailogs -->
        <AddWaterPaymentDialog
          v-model:visible="displayAddDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <EditWaterPaymentDialog
          v-model:visible="displayUpdateDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <FilterWaterPaymentDialog
          v-model:visible="displayFilterDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { WaterBillingPaymentService } from "@/service/WaterBillingPaymentService";

import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      datas: null,
      displayFilterDialog: false,
      displayAddDialog: false,
      displayUpdateDialog: false,
      hasDelete: false,
      isShowLoading: true,
      filters: {},
      formData: this.getInitialFormData(),
      tenants: [
        { label: "Dummy1 Dummy1 Dummy1", value: "Dummy1 Dummy1 Dummy1" },
        { label: "Dummy2 Dummy2 Dummy2", value: "Dummy2 Dummy2 Dummy2" },
        { label: "Dummy3 Dummy3 Dummy3", value: "Dummy3 Dummy3 Dummy3" },
        { label: "Dummy4 Dummy4 Dummy4", value: "Dummy4 Dummy4 Dummy4" },
      ],
    };
  },
  methods: {
    getInitialFormData() {
      return {
        tenants: this.tenants,
        tenant: null,
        prev_read: null,
        pres_read: null,
        amount: null,
        due_date: null,
        date_issue: null,
      };
    },
    getBadgeSeverity(dataStatus) {
      return dataStatus === 1 ? "info" : "warning";
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
    },
    openAddDialog() {
      this.displayAddDialog = true;
      this.formData = this.getInitialFormData();
    },
    openUpdateDialog(editdata) {
      this.displayUpdateDialog = true;
      this.formData = { ...editdata, tenants: this.tenants };
    },
    openFilterDialog() {
      this.displayFilterDialog = true;
      this.formData = this.getInitialFormData();
    },
    closeDialog() {
      this.displayAddDialog =
        this.displayUpdateDialog =
        this.displayFilterDialog =
          false;
    },
    printTable() {
      let contents = document.getElementById("printable").innerHTML;
      let frame1 = document.createElement("iframe");
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      document.body.appendChild(frame1);
      let frameDoc = frame1.contentWindow
        ? frame1.contentWindow
        : frame1.contentDocument.document
        ? frame1.contentDocument.document
        : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write(
        '<html lang="en"><head><title>Fiche Client</title>'
      );
      frameDoc.document.write(
        '<link rel="stylesheet" type="text/css" href="/print.css"/>'
      );
      frameDoc.document.write("</head><body>");
      frameDoc.document.write(contents);
      frameDoc.document.write("</body></html>");
      frameDoc.document.close();
      setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
      }, 500);
      return false;
    },
    exportCSV() {
      if (this.$refs.dt) {
        this.$refs.dt.exportCSV();
      } else {
        console.error("DataTable reference is not available.");
      }
    },
    exportPDF() {
      const doc = new jsPDF();
      const col = [
        "Room",
        "Tenant",
        "Previous Reading",
        "Present Reading",
        "Amount",
        "Due Date",
      ];
      const rows = this.datas.map((data) => [
        data.room,
        data.tenant,
        data.prev_read,
        data.pres_read,
        data.amount,
        data.due_date,
      ]);

      doc.autoTable({
        head: [col],
        body: rows,
        theme: "grid",
        styles: { fontSize: 8 },
        headStyles: { fillColor: [9, 9, 11] },
        margin: { top: 10 },
      });
      doc.save("download.pdf");
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
  created() {
    this.initFilters();
    const waterBillingPaymentService = new WaterBillingPaymentService();
    waterBillingPaymentService
      .getWaterBillingPayments()
      .then((data) => {
        this.datas = data;
      })
      .finally(() => {
        this.isShowLoading = false;
      });
  },
  mounted() {
    this.$toast = useToast();
  },
};
</script>

<style scoped></style>
