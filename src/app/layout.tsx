import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import AuthProvider from "./AuthProvider";
export const metadata: Metadata = {
  title: "AllCarsIn1",
  description: "Drivin' Your Dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><AuthProvider>{children}</AuthProvider></body>
      
    </html>
  );
}
