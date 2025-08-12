'use client';

import { store } from "../Redux/store";
import { Provider } from "react-redux";
import { ThemeContext } from "../Context/DarkTheme";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing in .env.local");
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <ThemeContext>{children}</ThemeContext>
      </Provider>
    </GoogleOAuthProvider>
  );
}
