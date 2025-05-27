import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
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
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    switch (event) {
      case "SIGNED_IN":
        console.log("SIGNED_IN");
        break;
      case "SIGNED_OUT":
        console.log("SIGNED_OUT");
        break;
      case "PASSWORD_RECOVERY":
        console.log("PASSWORD_RECOVERY");
        break;
      case "TOKEN_REFRESHED":
        console.log("TOKEN_REFRESHED");
        break;
      case "USER_UPDATED":
        console.log("USER_UPDATED");
        break;
      default:
        break;
    }
  });

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}