import axiosInstance from "@/service/axios-config";

const roomActions = {
  async uploadImage({ commit }, uploadImage) {
    let formData = new FormData();
    formData.append("image", uploadImage);

    await axiosInstance
      .post("/api/v1/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        commit("SET_IMAGE", response.data);
        commit("IS_UPLOAD", true);
      })
      .catch((error) => commit("IS_UPLOAD", false));
  },
  async getRooms({ commit }) {
    await axiosInstance
      .get("/api/v1/room/index")
      .then((response) => {
        commit("SET_DATA", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
  async storeData({ commit }, formData) {
    await axiosInstance
      .post("/api/v1/room/store", formData)
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
      .put(`/api/v1/room/update/${formData.id}`, formData)
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
      .put(`/api/v1/room/destroy/${formData.id}`, formData)
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

export default roomActions;
