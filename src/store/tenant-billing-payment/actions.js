import axiosInstance from "@/service/axios-config";

const tenantBillingPaymentActions = {
  async getTenantBillingPayments({ commit }) {
    await axiosInstance
      .get("/api/v1/tenantBillingPayment/index")
      .then((response) => {
        commit("SET_DATA", response.data);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        console.log(error.response.data);
        commit("IS_SUCCESS", false);
      });
  },
  async updateStatus({ commit }, formData) {
    await axiosInstance
      .put(`/api/v1/tenantBillingPayment/updateStatus/${formData.id}`)
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
      .post(`/api/v1/tenantBillingPayment/dateFilter`, { dateFilter: formData })
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

export default tenantBillingPaymentActions;
