import * as API from "../api/index";
import { auth } from "../reducers/slice/authSlice";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    console.log(data);
    dispatch(auth(data));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    dispatch(auth(data));

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
