import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import DesktopNavbar from "../components/DesktopNavbar";
import Footer from "../components/footer";
import ClientProvider from "./ClientProvider";
import MobileNavbar from "@/components/MobileNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deenify.com | DevelopedBy: Tipu-Sultan",
  description: "A comprehensive Islamic web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DesktopNavbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <MobileNavbar/>
            <Footer />
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
