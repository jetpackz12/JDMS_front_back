const homeMutations = {
  SET_DATA(state, data) {
    state.data = data;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  IS_SUCCESS(state, isSuccess) {
    state.isSuccess = isSuccess;
  },
};

export default homeMutations;
