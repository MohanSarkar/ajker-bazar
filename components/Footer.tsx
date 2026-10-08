export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Disclaimer Line (Matching Image Layout) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          <div>
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>
          <div>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </div>
        </div>

        {/* Company Branding Line */}
        <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
          Developed by{' '}
          <a
            href="https://sarkarsoftbd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#008a45] hover:underline"
          >
            sarkarsoftbd
          </a>
        </div>
      </div>
    </footer>
  );
}