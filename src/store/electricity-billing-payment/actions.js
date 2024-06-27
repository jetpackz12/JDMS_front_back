import axiosInstance from "@/service/axios-config";

const electricityBillingPaymentActions = {
  async getElectricityBillingPayments({ commit }) {
    await axiosInstance
      .get("/api/v1/electricityBillingPayment/index")
      .then((response) => {
        commit("SET_DATA", response.data);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        console.log(error.response.data);
        commit("IS_SUCCESS", false);
      });
  },
  async storeData({ commit }, formData) {
    await axiosInstance
      .post("/api/v1/electricityBillingPayment/store", formData)
      .then((response) => {
        commit("SET_MESSAGE", response.data.message);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_MESSAGE", error.response.data.message);
        commit("IS_SUCCESS", false);
      });
  },
  async updateData({ commit }, formData) {
    await axiosInstance
      .put(`/api/v1/electricityBillingPayment/update/${formData.id}`, formData)
      .then((response) => {
        commit("SET_MESSAGE", response.data.message);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_MESSAGE", error.response.data.message);
        commit("IS_SUCCESS", false);
      });
  },
  async deleteData({ commit }, formData) {
    await axiosInstance
      .delete(`/api/v1/electricityBillingPayment/destroy/${formData.id}`)
      .then((response) => {
        commit("SET_MESSAGE", response.data.message);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_MESSAGE", error.response.data.message);
        commit("IS_SUCCESS", false);
      });
  },
  async deleteDatas({ commit }, formData) {
    await axiosInstance
      .post(`/api/v1/electricityBillingPayment/destroys`, {
        electricityBillingIds: formData,
      })
      .then((response) => {
        commit("SET_MESSAGE", response.data.message);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_MESSAGE", error.response.data.message);
        commit("IS_SUCCESS", false);
      });
  },
  async dateFilter({ commit }, formData) {
    await axiosInstance
      .post(`/api/v1/electricityBillingPayment/dateFilter`, {
        dateFilter: formData,
      })
      .then((response) => {
        commit("SET_DATA", response.data.resData);
        commit("SET_MESSAGE", response.data.message);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_MESSAGE", error.response.data.message);
        commit("IS_SUCCESS", false);
      });
  },
};

export default electricityBillingPaymentActions;
