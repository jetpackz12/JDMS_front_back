const roomMutations = {
  SET_DATA(state, data) {
    state.data = data;
  },
  SET_IMAGE(state, image) {
    state.image = image;
  },
  IS_UPLOAD(state, isUpload) {
    state.isUpload = isUpload;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  IS_SUCCESS(state, isSuccess) {
    state.isSuccess = isSuccess;
  },
};

export default roomMutations;
