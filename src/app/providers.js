"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function Providers({ children }) {
  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'ı temizle
    const cleanup = () => {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("skinAnalyses_")) {
          localStorage.removeItem(key);
        }
      });
    };

    cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
