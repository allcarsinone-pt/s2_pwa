import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
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
      <body>{children}</body>
    </html>
  );
}
