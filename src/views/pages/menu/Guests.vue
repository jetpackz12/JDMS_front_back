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
              <Column field="duration" header="Duration"></Column>
              <Column field="payment" header="Payment"></Column>
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
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} guests"
          >
            <template #header>
              <div
                class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
              >
                <h5 class="m-0">Manage Guests</h5>
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
              field="duration"
              header="Duration"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Duration</span>
                {{ slotProps.data.duration }}
              </template>
            </Column>
            <Column
              field="payment"
              header="Payment"
              :sortable="true"
              headerStyle="width:14%; min-width:8rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Payment</span>
                {{ formatCurrency(parseInt(slotProps.data.payment)) }}
              </template>
            </Column>
            <Column
              field="statusName"
              header="Status"
              :sortable="true"
              headerStyle="width:14%; min-width:10rem;"
            >
              <template #body="slotProps">
                <span class="p-column-title">Status</span>
                <Tag :severity="getBadgeSeverity(slotProps.data.status)">{{
                  slotProps.data.statusName
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
        </div>

        <!-- Dailogs -->
        <AddGuestDialog
          v-model:visible="displayAddDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <EditGuestDialog
          v-model:visible="displayUpdateDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <DeleteGuestDialog
          v-model:visible="displayDeleteDataDialog"
          :formData="formData"
          @formSubmit="closeDialog()"
          @hideDialog="closeDialog()"
        />

        <DeleteGuestsDialog
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
import { GuestService } from "@/service/GuestService";

import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      datas: null,
      displayDeleteDataDialog: false,
      displayDeleteDatasDialog: false,
      displayAddDialog: false,
      displayUpdateDialog: false,
      selectedDatas: null,
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
        first_name: null,
        middle_name: null,
        last_name: null,
        address: null,
        contact_number: null,
        duration: null,
        payment: null,
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
    openAddDialog() {
      this.displayAddDialog = true;
      this.formData = this.getInitialFormData();
    },
    openUpdateDialog(editdata) {
      this.displayUpdateDialog = true;
      this.rooms = [
        ...this.rooms,
        { label: editdata.room, value: editdata.room_id },
      ];
      this.formData = { ...editdata, rooms: this.rooms };
    },
    openDeleteDataDialog(editdata) {
      this.formData = { full_name: editdata.full_name, id: editdata.id };
      this.displayDeleteDataDialog = true;
    },
    confirmDeleteSelected() {
      this.formData = this.selectedDatas.map((item) => item.id);
      this.displayDeleteDatasDialog = true;
    },
    closeDialog() {
      this.displayAddDialog =
        this.displayUpdateDialog =
        this.displayDeleteDataDialog =
        this.displayDeleteDatasDialog =
          false;
      this.selectedDatas = null;

      this.getGuests();
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
        "Duration",
        "Payment",
      ];
      const rows = this.datas.map((data) => [
        data.room,
        data.full_name,
        data.address,
        data.contact_number,
        data.duration,
        data.payment,
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
    async getGuests() {
      await this.$store.dispatch("guestModule/getGuests");

      this.datas = this.getData.guests
        .filter((item) => item.status === 1)
        .map((item) => ({
          ...item,
          statusName: item.status === 1 ? "Active" : "Inactive",
          duration: item.duration + " Hour"
        }));

      this.rooms = this.getData.rooms
        .filter((item) => item.availability === 1 && item.status === 1)
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
      return this.$store.getters["guestModule/data"];
    },
    isSuccess() {
      return this.$store.getters["guestModule/isSuccess"];
    },
  },
  mounted() {
    this.$toast = useToast();
    this.initFilters();
    this.getGuests();
  },
};
</script>

<style scoped></style>
