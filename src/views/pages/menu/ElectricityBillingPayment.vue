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
            :hasFilter="!hasDelete"
            :selectedDatas="selectedDatas"
            @openNew="openAddDialog"
            @confirmDeleteSelected="confirmDeleteSelected"
            @filter="openFilterDialog"
            @print="printTable"
            @excel="exportCSV"
            @pdf="exportPDF"
          />

          <div id="printable" class="card hidden">
            <DataTable :value="datas" tableStyle="min-width: 20rem">
              <Column field="room" header="Room"></Column>
              <Column field="unit_con" header="Unit Consumed"></Column>
              <Column field="amount" header="Amount"></Column>
              <Column field="due_date" header="Due Date"></Column>
              <Column field="date_issue" header="Date Issue"></Column>
            </DataTable>
          </div>

          <DataTable
            ref="dt"
            :value="datas"
            v-model:selection="selectedDatas"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} electricity billing payments"
          >
            <template #header>
              <div
                class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
              >
                <h5 class="m-0">Manage Electricity Billing Payments</h5>
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

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
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
              field="unit_con"
              header="Unit Consumed"
              :sortable="true"
              headerStyle="width:17%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Unit Consumed</span>
                {{ slotProps.data.unit_con }}
              </template>
            </Column>
            <Column
              field="amount"
              header="Amount"
              :sortable="true"
              headerStyle="width:17%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Amount</span>
                {{ formatCurrency(parseInt(slotProps.data.amount)) }}
              </template>
            </Column>
            <Column
              field="due_date"
              header="Due Date"
              :sortable="true"
              headerStyle="width:17%; min-width:8rem;"
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
              headerStyle="width:17%; min-width:8rem;"
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
                  class="ml-2"
                  severity="success"
                  rounded
                  @click="openUpdateDialog(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  class="ml-2"
                  severity="warning"
                  rounded
                  @click="openDeleteDataDialog(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Dailogs -->
        <AddElectricityPaymentDialog
          v-model:visible="displayAddDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <EditElectricityPaymentDialog
          v-model:visible="displayUpdateDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <DeleteElectricityPaymentDialog
          v-model:visible="displayDeleteDataDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <DeleteElectricityPaymentsDialog
          v-model:visible="displayDeleteDatasDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <FilterElectricityPaymentDialog
          v-model:visible="displayFilterDialog"
          :formData="formData"
          @formSubmit="closeDialogFilter()"
          @hideDialog="closeDialogFilter()"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      displayDeleteDataDialog: false,
      displayDeleteDatasDialog: false,
      selectedDatas: null,
      hasDelete: false,
      isShowLoading: true,
      filters: {},
      formData: this.getInitialFormData(),
      rooms: [],
    };
  },
  methods: {
    getInitialFormData() {
      return {
        rooms: this.rooms,
        room: null,
        prev_read: null,
        pres_read: null,
        amount: null,
        due_date: null,
        date_issue: null,
        isShowLoadingCircle: false,
        isDisabled: false,
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
    formatDate(value) {
      const date = new Date(value);
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    originalFormatDate(value) {
      let date = new Date(value);

      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let year = date.getFullYear();

      return `${month}/${day}/${year}`;
    },
    openAddDialog() {
      this.displayAddDialog = true;
      this.formData = this.getInitialFormData();
    },
    openUpdateDialog(editdata) {
      this.displayUpdateDialog = true;

      this.formData = {
        ...editdata,
        due_date: this.originalFormatDate(editdata.due_date),
        date_issue: this.originalFormatDate(editdata.date_issue),
        rooms: this.rooms,
      };
    },
    openDeleteDataDialog(editdata) {
      this.formData = { room: editdata.room, id: editdata.id };
      this.displayDeleteDataDialog = true;
    },
    confirmDeleteSelected() {
      this.formData = this.selectedDatas.map((item) => item.id);
      this.displayDeleteDatasDialog = true;
    },
    openFilterDialog() {
      this.displayFilterDialog = true;
      this.formData = this.getInitialFormData();
    },
    closeDialog() {
      this.displayAddDialog =
        this.displayUpdateDialog =
        this.displayDeleteDataDialog =
        this.displayDeleteDatasDialog =
          false;

      this.selectedDatas = null;

      this.getElectricityBillingPayments();
    },
    closeDialogFilter() {
      this.displayFilterDialog = false;

      this.getElectricityBillingPaymentData();
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
      const col = ["Room", "Unit Consumed", "Amount", "Due Date"];
      const rows = this.datas.map((data) => [
        data.room,
        data.unit_con,
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
    async getElectricityBillingPayments() {
      await this.$store.dispatch(
        "electricityBillingPaymentModule/getElectricityBillingPayments"
      );

      this.getElectricityBillingPaymentData();
    },
    getElectricityBillingPaymentData() {
      this.datas = this.getData.electricityBillingPayment.map((item) => {
        return {
          ...item,
          due_date: this.formatDate(item.due_date),
          date_issue: this.formatDate(item.date_issue),
        };
      });

      this.rooms = this.getData.rooms
        .filter((item) => item.status === 1)
        .map((item) => ({
          label: item.room,
          value: item.id,
        }));

      if (this.isSuccess) {
        this.isShowLoading = false;
      }
    },
  },
  computed: {
    getData() {
      return this.$store.getters["electricityBillingPaymentModule/data"];
    },
    isSuccess() {
      return this.$store.getters["electricityBillingPaymentModule/isSuccess"];
    },
  },
  mounted() {
    this.$toast = useToast();
    this.initFilters();
    this.getElectricityBillingPayments();
  },
};
</script>

<style scoped></style>
