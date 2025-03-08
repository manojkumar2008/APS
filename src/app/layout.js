"use client";

import { store } from "@/service/globalVariables/Store";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/aps_logo2.png" />
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
