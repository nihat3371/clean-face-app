import Link from "next/link";

export default function TabBar({ active = "home" }) {
  return (
    <nav className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-lg flex justify-between items-center px-6 min-h-[72px] py-3 fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      <Link
        href="/"
        className={`flex flex-col items-center ${
          active === "home" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M3 11.5V19a2 2 0 002 2h3m10-9.5V19a2 2 0 01-2 2h-3m-6-9.5l5-5 5 5m-10 0h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs mt-1 font-medium">Ana Sayfa</span>
      </Link>
      <Link
        href="/analysis"
        className={`flex flex-col items-center ${
          active === "analysis" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M9 3H4a2 2 0 00-2 2v5a2 2 0 002 2h5a2 2 0 002-2V5a2 2 0 00-2-2zM20 3h-5a2 2 0 00-2 2v5a2 2 0 002 2h5a2 2 0 002-2V5a2 2 0 00-2-2zM9 14H4a2 2 0 00-2 2v5a2 2 0 002 2h5a2 2 0 002-2v-5a2 2 0 00-2-2zM20 14h-5a2 2 0 00-2 2v5a2 2 0 002 2h5a2 2 0 002-2v-5a2 2 0 00-2-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs mt-1 font-medium">Analiz</span>
      </Link>
      <Link
        href="/history"
        className={`flex flex-col items-center ${
          active === "history" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs mt-1 font-medium">Geçmiş</span>
      </Link>
      <Link
        href="/products"
        className={`flex flex-col items-center ${
          active === "products" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M3 3h18v2a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm0 4h18v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs mt-1 font-medium">Ürünler</span>
      </Link>
      <Link
        href="/account"
        className={`flex flex-col items-center ${
          active === "account" ? "text-blue-600" : "text-gray-400"
        }`}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-8 8a8 8 0 0116 0v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1a8 8 0 018-8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs mt-1 font-medium">Hesabım</span>
      </Link>
    </nav>
  );
}
