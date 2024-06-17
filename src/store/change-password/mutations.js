const changePasswordMutations = {
  SET_MESSAGE_SUCCESS(state, message) {
    state.message = message;
    state.isSuccess = true;
  },
  SET_MESSAGE_FAILED(state, message) {
    state.message = message;
    state.isSuccess = false;
  }
};

export default changePasswordMutations;
