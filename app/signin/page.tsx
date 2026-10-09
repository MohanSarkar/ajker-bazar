"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // ১. টোস্ট ইম্পোর্ট করা হলো

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          // সফল সাইন ইনে টোস্ট এবং হোমপেজে রিডাইরেক্ট
          toast.success("সফলভাবে সাইন ইন হয়েছে!");
          router.push("/?success=login");
        },
        onError: (ctx) => {
          const errorMsg = ctx.error.message || "সাইন ইন করতে সমস্যা হয়েছে";
          setError(errorMsg);
          toast.error(errorMsg); // এরর টোস্ট দেখানো হলো
          setLoading(false);
        },
      }
    );
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    toast.loading("রিডাইরেক্ট করা হচ্ছে...");
    await authClient.signIn.social({
      provider,
      callbackURL: "/?success=login",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f4] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          আপনার অ্যাকাউন্টে সাইন ইন করুন
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200/80">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleEmailSignIn}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল এড্রেস
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs placeholder-gray-400 focus:outline-none focus:ring-[#008a45] focus:border-[#008a45] sm:text-sm text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-xs placeholder-gray-400 focus:outline-none focus:ring-[#008a45] focus:border-[#008a45] sm:text-sm text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-[#008a45] hover:bg-[#007038] focus:outline-none"
              >
                {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">অথবা সোশ্যাল লগইন</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialSignIn("google")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-xs bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Google
              </button>
              <button
                onClick={() => handleSocialSignIn("github")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-xs bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/signup" className="font-medium text-[#008a45] hover:underline">
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}