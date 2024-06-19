import axiosInstance from "@/service/axios-config";

const tenantActions = {
  async getTenants({ commit }) {
    await axiosInstance
      .get("/api/v1/tenant/index")
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
      .post("/api/v1/tenant/store", formData)
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
      .put(`/api/v1/tenant/update/${formData.id}`, formData)
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
      .delete(`/api/v1/tenant/destroy/${formData.id}`)
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
      .post(`/api/v1/tenant/destroys`, { tenantIds:formData })
      .then((response) => {
        commit("SET_MESSAGE", response.data.message);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        commit("SET_MESSAGE", error.response.data.message);
        commit("IS_SUCCESS", false);
      });
  },
};

export default tenantActions;
