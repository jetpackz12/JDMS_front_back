import roomGetters from "./getters";
import roomMutations from "./mutations";
import roomActions from "./actions";

const roomModule = {
  namespaced: true,
  state() {
    return {
      data: null,
      image: null,
      message: null,
      isSuccess: false,
      isUpload: false,
    };
  },
  getters: roomGetters,
  mutations: roomMutations,
  actions: roomActions,
};

export default roomModule;
