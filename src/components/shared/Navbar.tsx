"use client"
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
const {data:seassion} = authClient.useSession();
const user = seassion?.user

  const handleSignOut = async()=>{
    await authClient.signOut();
  }

  return (
    <header className="w-full bg-[#1e2a4a] text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-11 items-center justify-center rounded-full bg-[#3b4a6e]">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-7"
              aria-hidden="true"
            >
              {/* car body */}
              <path
                d="M8 28c0-1.6.8-3 2-3.8L12 20c.8-2 2.6-3.5 4.8-3.5h14.4c2.2 0 4 1.5 4.8 3.5l2 4.2c1.2.8 2 2.2 2 3.8v5a1.5 1.5 0 0 1-1.5 1.5H36a4 4 0 0 1-8 0h-8a4 4 0 0 1-8 0H9.5A1.5 1.5 0 0 1 8 33v-5Z"
                fill="#f5b73d"
              />
              {/* windshield */}
              <path
                d="M15.5 24 17 19.8c.4-1 1.3-1.8 2.4-1.8h9.2c1.1 0 2 .8 2.4 1.8L32.5 24h-17Z"
                fill="#7ec8f2"
              />
              {/* wheels */}
              <circle cx="16" cy="34" r="3" fill="#2b3a5c" />
              <circle cx="32" cy="34" r="3" fill="#2b3a5c" />
              {/* water drops */}
              <path
                d="M14 12c0 1.2-.9 2-2 2s-2-.8-2-2c0-1.4 2-3.5 2-3.5s2 2.1 2 3.5Z"
                fill="#4db6e8"
              />
              <path
                d="M26 9c0 1.2-.9 2-2 2s-2-.8-2-2c0-1.4 2-3.5 2-3.5S26 7.6 26 9Z"
                fill="#4db6e8"
              />
              <path
                d="M38 12c0 1.2-.9 2-2 2s-2-.8-2-2c0-1.4 2-3.5 2-3.5s2 2.1 2 3.5Z"
                fill="#4db6e8"
              />
            </svg>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:+8801706785160"
            className="hidden text-sm font-medium tracking-wide hover:underline sm:block md:text-base"
          >
            Call us now: +880170678-5160
          </a>

          {/* WhatsApp */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <a
              href="https://wa.me/8801706785160"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
              </svg>
            </a>
          </Button>

          {/* Sign In */}
          {user ? (
            <>
              <Popover>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                      aria-label="Open profile menu"
                    />
                  }
                >
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-64">
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>{user?.email}</PopoverDescription>
                  </PopoverHeader>

                  <div className="flex flex-col gap-1 py-2">
                    <Link
                      href="/profile"
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      My Profile
                    </Link>
                    <Link
                      href={`/dashboard/${seassion.user?.role}`}
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      Dashboard
                    </Link>
                  </div>

                  <div className="border-t pt-3">
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/sign-in" aria-label="Sign In Page">
                  <User className="size-5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
