const authMutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isAuthenticated = true;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
  },
};

export default authMutations;
