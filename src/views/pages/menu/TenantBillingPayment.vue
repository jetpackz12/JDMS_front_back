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
            :hasNew="hasNew"
            :hasDelete="hasDelete"
            :hasFilter="!hasDelete"
            @openNew="openPrintDialog"
            @filter="openFilterDialog"
            @print="printTable"
            @excel="exportCSV"
            @pdf="exportPDF"
          />

          <div id="printable" class="card hidden">
            <DataTable :value="datas" tableStyle="min-width: 20rem">
              <Column field="room" header="Room"></Column>
              <Column field="price" header="Room Price"></Column>
              <Column field="electricity" header="Electricity Billing"></Column>
              <Column field="water" header="Water Billing"></Column>
              <Column field="totalBilling" header="Total Billing"></Column>
              <Column field="date" header="Date"></Column>
              <Column
                field="tenant_billing_status_name"
                header="Status"
              ></Column>
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
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenant billing payments"
          >
            <template #header>
              <div
                class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
              >
                <h5 class="m-0">Tenant Billing Payments</h5>
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
              field="price"
              header="Room Price"
              :sortable="true"
              headerStyle="width:14%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Room Price</span>
                {{ formatCurrency(parseInt(slotProps.data.price)) }}
              </template>
            </Column>
            <Column
              field="electricity"
              header="Electricity Billing"
              :sortable="true"
              headerStyle="width:16%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Electricity Billing</span>
                {{ slotProps.data.electricity }}
              </template>
            </Column>
            <Column
              field="water"
              header="Water Billing"
              :sortable="true"
              headerStyle="width:16%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Water Billing</span>
                {{ slotProps.data.water }}
              </template>
            </Column>
            <Column
              field="totalBilling"
              header="Total Billing"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Total Billing</span>
                {{ formatCurrency(parseInt(slotProps.data.totalBilling)) }}
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
            <Column
              field="tenant_billing_status_name"
              header="Status"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Status</span>
                <Tag
                  :severity="
                    getBadgeSeverity(slotProps.data.tenant_billing_status)
                  "
                >
                  {{ slotProps.data.tenant_billing_status_name }}</Tag
                >
              </template>
            </Column>
            <Column headerStyle="min-width:10rem;">
              <template #body="slotProps">
                <Button
                  icon="pi pi-print"
                  class="ml-5"
                  severity="info"
                  rounded
                  @click="openPrintDialog(slotProps.data)"
                />
                <Button
                  v-if="slotProps.data.tenant_billing_status === 1"
                  icon="pi pi-check"
                  class="ml-3"
                  severity="success"
                  rounded
                  @click="openUnpaidDialog(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Dailogs -->
        <PrintTenantPaymentDialog
          v-model:visible="displayPrintDialog"
          :formData="formData"
          :tenantData="tenantData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <UnpaidTenantDialog
          v-model:visible="displayUnpaidDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <FilterTenantPaymentDialog
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
      displayPrintDialog: false,
      displayUnpaidDialog: false,
      hasNew: false,
      hasDelete: false,
      isShowLoading: true,
      filters: {},
      formData: this.getInitialFormData(),
      tenants: null,
      tenantData: null
    };
  },
  methods: {
    getInitialFormData() {
      return {
        tenants : this.tenants,
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
      return dataStatus === 1 ? "warning" : "info";
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
    openPrintDialog(editdata) {
      this.displayPrintDialog = true;
      const room_tenant = this.tenants.filter((item) => item.room_id === editdata.room_id).map((item) => ({tenant: item.full_name}));
      this.formData = [ editdata ];
      this.tenantData = room_tenant;
    },
    openUnpaidDialog(editdata) {
      this.displayUnpaidDialog = true;

      this.formData = editdata;
    },
    openFilterDialog() {
      this.displayFilterDialog = true;
      this.formData = this.getInitialFormData();
    },
    closeDialog() {
      this.displayPrintDialog = this.displayUnpaidDialog = false;

      this.getTenantBillingPayments();
    },
    closeDialogFilter() {
      this.displayFilterDialog = false;

      this.getTenantBillingPaymentData();
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
        "Electricity Billing",
        "Water Billing",
        "Total Billing",
        "Date",
        "Status",
      ];
      const rows = this.datas.map((data) => [
        data.room,
        data.electricity,
        data.water,
        data.totalBilling,
        data.date,
        data.tenant_billing_status_name,
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
    async getTenantBillingPayments() {
      await this.$store.dispatch(
        "tenantBillingPaymentModule/getTenantBillingPayments"
      );

      this.getTenantBillingPaymentData();
    },
    getTenantBillingPaymentData() {
      this.datas = this.getData.tenantBillingPayment.map((item) => {
        return {
          ...item,
          water: [
            `Previous Reading: ${item.prev_read}`,
            `Present Reading: ${item.pres_read}`,
            `Amount: ${item.water_amount}`,
            `Due Date: ${this.formatDate(item.water_due_date)}`,
            `Date Issue: ${this.formatDate(item.water_date_issue)}`,
          ].join(", "),
          electricity: [
            `Unit Consumed: ${item.unit_con}`,
            `Amount: ${item.electricity_amount}`,
            `Due Date: ${this.formatDate(item.electricity_due_date)}`,
            `Date Issue: ${this.formatDate(item.electricity_date_issue)}`,
          ].join(", "),
          tenant_billing_status_name:
            item.tenant_billing_status === 1 ? "Unpaid" : "Paid",
          totalBilling:
            parseInt(item.price) +
            parseInt(item.electricity_amount) +
            parseInt(item.water_amount),
          calculation: `Room ( ₱${item.price} ) + Water ( ₱${item.water_amount} ) + Electricity ( ₱${item.electricity_amount} )`,
          date: this.formatDate(item.tenant_billing_created_at),
        };
      });

      this.tenants = this.getData.tenants;

      if (this.isSuccess) {
        this.isShowLoading = false;
      }
    },
  },
  computed: {
    getData() {
      return this.$store.getters["tenantBillingPaymentModule/data"];
    },
    isSuccess() {
      return this.$store.getters["tenantBillingPaymentModule/isSuccess"];
    },
  },
  mounted() {
    this.$toast = useToast();
    this.initFilters();
    this.getTenantBillingPayments();
  },
};
</script>

<style scoped></style>
