"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="rounded-lg bg-blue-500/20 p-1.5">
            <BrainCircuit className="text-blue-400" size={24} />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-100">
            DSA<span className="text-purple-500">Tutor</span>
          </span>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          
          {/* Ye tab dikhega jab user logged out hai */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-lg text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                Log In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200 shadow-lg shadow-white/10">
                Get Started
              </button>
            </SignInButton>
          </Show>

          {/* Ye tab dikhega jab user logged in hai */}
          <Show when="signed-in">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-zinc-800 hover:ring-purple-500 transition-all"
                }
              }}
            />
          </Show>

        </div>
      </div>
    </nav>
  );
}