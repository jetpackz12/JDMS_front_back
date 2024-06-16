<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <TableToolKit
          :selectedDatas="selectedDatas"
          @openNew="openAddDialog"
          @confirmDeleteSelected="confirmDeleteSelected"
          @print="printTable"
          @excel="exportCSV"
          @pdf="exportPDF"
        />

        <div id="printable" class="card hidden">
          <DataTable :value="datas" tableStyle="min-width: 20rem">
            <Column field="room" header="Room"></Column>
            <Column field="full_name" header="Name"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="contact_number" header="Number"></Column>
            <Column field="month_deposit" header="Deposit"></Column>
            <Column field="month_advance" header="Advance"></Column>
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
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tenants"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Manage Tenants</h5>
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
            field="full_name"
            header="Name"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.full_name }}
            </template>
          </Column>
          <Column
            field="address"
            header="Address"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Address</span>
              {{ slotProps.data.address }}
            </template>
          </Column>
          <Column
            field="contact_number"
            header="Number"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Number</span>
              {{ slotProps.data.contact_number }}
            </template>
          </Column>
          <Column
            field="month_deposit"
            header="Deposit"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Deposit</span>
              {{ formatCurrency(slotProps.data.month_deposit) }}
            </template>
          </Column>
          <Column
            field="month_advance"
            header="Advance"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Advance</span>
              {{ formatCurrency(slotProps.data.month_advance) }}
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Status</span>
              <Tag :severity="getBadgeSeverity(slotProps.data.status)">{{
                slotProps.data.status === 1 ? "Active" : "Inactive"
              }}</Tag>
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="mr-2"
                severity="success"
                rounded
                @click="openUpdateDialog(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="mt-2"
                severity="warning"
                rounded
                @click="openDeleteDataDialog(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <!-- Dailogs -->
        <AddTenantDialog
          v-model:visible="displayAddDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <EditTenantDialog
          v-model:visible="displayUpdateDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <DeleteTenantDialog
          v-model:visible="displayDeleteDataDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <DeleteTenantsDialog
          v-model:visible="displayDeleteDatasDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TenantService } from "@/service/TenantService";

import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      datas: null,
      displayDeleteDataDialog: false,
      displayDeleteDatasDialog: false,
      displayAddDialog: false,
      displayUpdateDialog: false,
      selectedDatas: null,
      filters: {},
      formData: this.getInitialFormData(),
      rooms: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
    };
  },
  methods: {
    ...mapActions("authModule", ["checkAuth"]),
    getInitialFormData() {
      return {
        rooms: this.rooms,
        room: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        address: null,
        contact_number: null,
        month_deposit: null,
        month_advance: null,
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
      this.formData = { ...editdata, rooms: this.rooms };
    },
    openDeleteDataDialog(editdata) {
      this.formData = { full_name: editdata.full_name, id: editdata.id };
      this.displayDeleteDataDialog = true;
    },
    confirmDeleteSelected() {
      this.formData = this.selectedDatas;
      this.displayDeleteDatasDialog = true;
    },
    closeDialog() {
      this.displayAddDialog =
        this.displayUpdateDialog =
        this.displayDeleteDialog =
        this.displayDeleteDataDialog =
        this.displayDeleteDatasDialog =
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
        "Full name",
        "Address",
        "Number",
        "Deposit",
        "Advance",
      ];
      const rows = this.datas.map((data) => [
        data.room,
        data.full_name,
        data.address,
        data.contact_number,
        data.month_deposit,
        data.month_advance,
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
    const tenantService = new TenantService();
    tenantService.getTenants().then((data) => {
      this.datas = data.filter((item) => {
        return item.status === 1;
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
