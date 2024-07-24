import "./globals.css";
import AppBarHeader from "@/components/AppBarHeader";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />

        <Container maxWidth="xl">
          <AppBarHeader />
          {children}
        </Container>
      </body>
    </html>
  );
}
