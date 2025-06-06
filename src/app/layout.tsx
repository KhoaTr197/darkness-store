import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Footer, Header } from "@/components/layout";
// --------------------------------

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Darkness Store",
  description: "Darkness Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
