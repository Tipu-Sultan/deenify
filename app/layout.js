import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Deenify.com | DevelopedBy: Tipu-Sultan',
  description: 'A comprehensive Islamic web application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar/>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}