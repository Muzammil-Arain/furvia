import { VARIABLES } from "constants/common";
import store from "store/store";
import { setItem } from "utils/storage";

export const saveUserSession = async (user: any, token: string, role: string) => {
  store.dispatch(setUserRole(role));
  store.dispatch(setUserDetails(user));
  await Promise.all([
    setItem(VARIABLES.USER_TOKEN, token),
    setItem(VARIABLES.USER_DATA, user),
    setItem(VARIABLES.IS_USER_LOGGED_IN, true),
  ]);
  store.dispatch(setIsUserLoggedIn(true));
};
