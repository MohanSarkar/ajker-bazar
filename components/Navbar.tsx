'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const { data: session } = useSession();
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setFormattedDate(dateString);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo & Date */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#008a45] rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl shadow-sm shrink-0">
            🛒
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </span>
            {formattedDate && (
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">
                {formattedDate}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-gray-200"
              >
                <div className="w-10 rounded-full bg-[#008a45] text-white flex items-center justify-center font-bold">
                  {session.user?.name?.[0] || 'U'}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100"
              >
                <li className="menu-title px-4 py-1 text-xs text-gray-500">
                  {session.user?.email}
                </li>
                <li>
                  <Link href="/profile">প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>লগআউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-gray-800 hover:text-black font-semibold text-base transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-[#008a45] hover:bg-[#00753a] text-white font-semibold text-base px-6 py-2.5 rounded-lg shadow-sm transition-colors"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-black rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3">
          {session ? (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-600 px-2">
                {session.user?.email}
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 px-3 text-gray-800 font-medium rounded-lg hover:bg-gray-100"
              >
                প্রোফাইল
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 text-red-600 font-medium rounded-lg hover:bg-red-50"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-gray-800 font-semibold border border-gray-300 rounded-lg"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#008a45] text-white font-semibold rounded-lg shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}