import axiosInstance from "@/service/axios-config";

const waterBillingPaymentActions = {
  async getWaterBillingPayments({ commit }) {
    await axiosInstance
      .get("/api/v1/waterBillingPayment/index")
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
      .post("/api/v1/waterBillingPayment/store", formData)
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
      .put(`/api/v1/waterBillingPayment/update/${formData.id}`, formData)
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
      .delete(`/api/v1/waterBillingPayment/destroy/${formData.id}`)
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
      .post(`/api/v1/waterBillingPayment/destroys`, { waterBillingIds:formData })
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
      .post(`/api/v1/waterBillingPayment/dateFilter`, { dateFilter: formData })
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

export default waterBillingPaymentActions;
