"use client";

import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/service/globalVariables/Store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
