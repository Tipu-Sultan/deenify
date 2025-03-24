import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import DesktopNavbar from "../components/DesktopNavbar";
import Footer from "../components/footer";
import ClientProvider from "./ClientProvider";
import MobileNavbar from "@/components/MobileNavbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deenify.com | DevelopedBy: Tipu-Sultan",
  description: "A comprehensive Islamic web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="google-site-verification" content="MgAlLUfNQ_EqUemSJdUo_t6xAWPCvcvQEQkMO4LJBho" />
        <meta name="description" content="Deenify offers Islamic resources, tools, and content for Muslims worldwide." />
      </head>
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <DesktopNavbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <MobileNavbar />
            <Footer />
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
