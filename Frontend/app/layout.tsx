import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from './components/Navbar';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'DSA Tutor Agent',
  description: 'AI-powered DSA solving and tutoring',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#8b5cf6' } }}>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-purple-500/30">
          <Navbar /> {/* <--- Add it right above children */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}