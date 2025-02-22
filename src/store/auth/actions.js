import axios from "axios";
import axiosInstance from "@/service/axios-config";

const authActions = {
  async login({ commit }, formData) {
    await axios
      .post("/api/v1/login", formData)
      .then((response) => {
        commit("SET_TOKEN", response.data.resData.token);
        commit("SET_USER", response.data.resData.user);
        localStorage.setItem("token", response.data.resData.token);
      })
      .catch((error) => console.log(error.response.data));
  },
  async checkAuth({ commit }) {
    const token = { token: localStorage.getItem("token") };
    await axiosInstance
      .post("/api/v1/user/checkAuth", token)
      .then((response) => {
        commit("SET_USER", response.data.resData.user);
      })
      .catch((error) => {
        commit("LOGOUT");
        localStorage.setItem("token", null);
      });
  },
  async logout({ commit }) {
    const token = { token: localStorage.getItem("token") };
    await axiosInstance
      .post("/api/v1/user/logout", token)
      .then((response) => {
        commit("LOGOUT");
        localStorage.setItem("token", null);
      })
      .catch((error) => console.log(error.response.data));
  },
};

export default authActions;
