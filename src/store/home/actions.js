import axiosInstance from "@/service/axios-config";

const homeActions = {
  async getHomeData({ commit }) {
    await axiosInstance
      .get("/api/v1/home/index")
      .then((response) => {
        commit("SET_DATA", response.data);
        commit("IS_SUCCESS", true);
      })
      .catch((error) => {
        console.log(error.response.data);
        commit("IS_SUCCESS", false);
      });
  },
};

export default homeActions;
