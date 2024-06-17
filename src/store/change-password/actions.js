import axiosInstance from "@/service/axios-config";
import store from "@/store";

const changePasswordActions = {
  async changePassword({ commit }, formData) {
    const userId = store.getters["authModule/user"];

    await axiosInstance
      .put(`/api/v1/changePassword/${userId.id}`, formData)
      .then((response) => {
        commit("SET_MESSAGE_SUCCESS", response.data.message);
      })
      .catch((error) => {
        commit("SET_MESSAGE_FAILED", error.response.data.message);
      });
  },
};

export default changePasswordActions;
