<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <TableToolKit
          :hasNew="hasNew"
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
            <Column field="transaction" header="Transaction"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="date" header="Date"></Column>
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
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} reports"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Manage Reports</h5>
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
            field="transaction"
            header="Transaction"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Transaction</span>
              {{ slotProps.data.transaction }}
            </template>
          </Column>
          <Column field="description" header="Description" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Description</span>
              {{ slotProps.data.description }}
            </template>
          </Column>
          <Column
            field="date"
            header="Date"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Date</span>
              {{ slotProps.data.date }}
            </template>
          </Column>
        </DataTable>

        <!-- Dailogs -->
        <FilterReportDialog
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
import { ReportService } from "@/service/ReportService";

import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      datas: null,
      displayFilterDialog: false,
      hasDelete: false,
      hasNew: false,
      isFilterByTransaction: false,
      filters: {},
      formData: this.getInitialFormData(),
      transactions: [
        { label: "Water Billing Payment", value: "1" },
        { label: "Electricity Billing Payment", value: "2" },
      ],
    };
  },
  methods: {
    ...mapActions("authModule", ["checkAuth"]),
    getInitialFormData() {
      return {
        transactions: this.transactions,
        transaction: null,
        date: null,
      };
    },
    openFilterDialog() {
      this.displayFilterDialog = true;
      this.formData = this.getInitialFormData();
    },
    closeDialog() {
      this.displayFilterDialog = false;
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
      const col = ["Transaction", "Description", "date"];
      const rows = this.datas.map((data) => [
        data.transaction,
        data.description,
        data.date,
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
    const reportService = new ReportService();
    reportService.getReports().then((data) => {
      this.datas = data.map((item) => {
        let data = {};
        if (item.transaction === "1") {
          data = {
            ...item,
            transaction: "Water Billing Payment",
            description: [
              `Room: ${item.description.room}`,
              `Tenant: ${item.description.tenant}`,
              `Previous Reading: ${item.description.prev_read}`,
              `Present Reading: ${item.description.pres_read}`,
              `Amount: ${item.description.amount}`,
              `Due Date: ${item.description.due_date}`,
              `Date Issue: ${item.description.date_issue}`,
            ].join(", "),
          };
        } else {
          data = {
            ...item,
            transaction: "Electricity Billing Payment",
            description: [
              `Room:  ${item.description.room}`,
              `Tenant: ${item.description.tenant}`,
              `Unit Consumed: ${item.description.unit_con}`,
              `Amount: ${item.description.amount}`,
              `Due Date: ${item.description.due_date}`,
              `Date Issue: ${item.description.date_issue}`,
            ].join(", "),
          };
        }

        return data;
      });
    });
  },
  mounted() {
    this.$toast = useToast();
    this.checkAuth();
  },
};
</script>

<style scoped></style>
