"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // ১. টোস্ট ইম্পোর্ট করা হলো

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট করা হয়েছে!"); // ২. সফল সাইন আউটের টোস্ট
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo & Title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#058240] flex items-center justify-center text-white shadow-sm">
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.05-.828 2.193-1.942l.842-6.53a1.125 1.125 0 0 0-1.112-1.278H6.12M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </span>
            <span className="text-xs text-gray-500 font-medium">
              শুক্রবার, ৯ অক্টোবর, ২০২৬
            </span>
          </div>
        </Link>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-20 h-9 bg-gray-100 animate-pulse rounded-lg"></div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#058240] flex items-center justify-center font-bold text-sm">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="hidden sm:inline-block text-sm font-medium text-gray-800">
                  {session.user.name}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-sm font-semibold text-gray-800 hover:text-[#058240] transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 rounded-xl bg-[#058240] hover:bg-[#046c35] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}