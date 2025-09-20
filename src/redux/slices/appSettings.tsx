import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppSettingsState {
  isUserLoggedIn: boolean;
  isAppLoading: boolean;
  isUserVisitedApp: boolean;
  appLanguage: string;
  userRole: 'user' | 'provider' | null;
}

const initialState: AppSettingsState = {
  isUserLoggedIn: false,
  isAppLoading: false,
  isUserVisitedApp: false,
  appLanguage: '',
  userRole: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsUserLoggedIn(state, action: PayloadAction<boolean>) {
      state.isUserLoggedIn = action.payload;
    },
    setIsUserVisitedApp(state, action: PayloadAction<boolean>) {
      state.isUserVisitedApp = action.payload;
    },
    setUserRole(state, action: PayloadAction<'user' | 'provider'>) {
      state.userRole = action.payload;
    },
    setIsAppLoading(state, action: PayloadAction<boolean>) {
      state.isAppLoading = action.payload;
    },
    setAppLanguage(state, action: PayloadAction<string>) {
      state.appLanguage = action.payload;
    },
  },
});

export const { setIsUserLoggedIn, setIsUserVisitedApp, setIsAppLoading,setUserRole, setAppLanguage } =
  appSlice.actions;
export default appSlice.reducer;
