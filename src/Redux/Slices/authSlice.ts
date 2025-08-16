import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id?: string;
  name: string;
  email: string;
  profilePic?: string | null;
  role?: string;
  isAdmin?: boolean;
}

interface AuthState {
  user:  User | null,
  token: string | null,
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user:  typeof window !== "undefined" ? JSON.parse(Cookies.get("user")  || "null") : null,
  token: typeof window !== "undefined" ? Cookies.get("token") || null : null,
  loading: false,
  error: null,
};

// Thunk for Google Popup Token Flow
export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      // initTokenClient must be called on user gesture
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        callback: async (tokenResponse: any) => {
          // tokenResponse has access_token
          const accessToken = tokenResponse.access_token;
          try {
            // Send access token to backend for DB save + our JWT
            const backendRes = await axios.post("/api/auth/google", { accessToken });
            return backendRes.data; // { user, token }
          } catch (err: any) {
            throw err.response?.data || err.message;
          }
        },
      });

      // Request access token (opens popup)
      const promise = new Promise<any>((resolve, reject) => {
        // The callback passed to initTokenClient will run after requestAccessToken
        // But we need to capture its result. We'll temporarily replace the callback to resolve.
        (tokenClient as any).callback = async (tokenResponse: any) => {
          const accessToken = tokenResponse.access_token;
          try {
            const backendRes = await axios.post("/api/auth", { accessToken });
            resolve(backendRes.data);
          } catch (err: any) {
            reject(err.response?.data || err.message);
          }
        };
        tokenClient.requestAccessToken();
      });

      const data = await promise;
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
    setAuth(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      //save in cookies 
      Cookies.set("user", JSON.stringify(action.payload.user), {expires : 7})
      Cookies.set("token", action.payload.token, {expires:7})
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("user", JSON.stringify(action.payload.user), {expires : 7})
        Cookies.set("token", action.payload.token, {expires:7})
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
