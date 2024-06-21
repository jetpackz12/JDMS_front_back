import axiosInstance from "@/service/axios-config";

const reportActions = {
  async getReports({ commit }) {
    await axiosInstance
      .get("/api/v1/report/index")
      .then((response) => {
        commit("SET_DATA", response.data);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        console.log(error.response.data);
        commit("IS_SUCCESS", false);
      });
  },
  async dateFilter({ commit }, formData) {
    await axiosInstance
      .post(`/api/v1/report/dateFilter`, {
        transaction: formData.transaction,
        dateFilter: formData.date,
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

export default reportActions;
