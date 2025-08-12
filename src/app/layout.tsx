import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar"
import { ThemeContext} from "../Context/DarkTheme";
import {store} from '../Redux/store'
import { Provider } from "react-redux";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntelliBlog",
  description: "AI Blog Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider   store={store}>
        <ThemeContext>
        <Navbar />
        {children}
      </ThemeContext>
        </Provider>
      </body>
    </html>
  );
}
