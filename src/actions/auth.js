import * as API from "../api/index";
import { auth, hasAuthError } from "../reducers/slice/authSlice";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    dispatch(auth({ data: data }));
    history.push("/");
  } catch (error) {
    dispatch(hasAuthError(error.response.data));
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch(auth({ data: data }));

    history.push("/");
  } catch (error) {
    dispatch(hasAuthError(error.response.data));
  }
};
