"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import TabBar from "../components/TabBar";
import { useRouter } from "next/navigation";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();
  const [remaining, setRemaining] = useState(3);
  const total = 3;

  useEffect(() => {
    // Guest kullanıcı için kalan hak sayısını al
    if (!session) {
      const guestAttempts = localStorage.getItem("guestRemainingAttempts");
      if (guestAttempts) {
        setRemaining(parseInt(guestAttempts));
      }
    }
  }, [session]);

  // Bar rengi kalan hakka göre değişiyor
  let barClass = "";
  let barStyle = {};
  if (remaining === 3) {
    barClass =
      "bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 animate-pulse";
  } else if (remaining === 2) {
    barClass = "bg-gradient-to-r from-blue-300 to-yellow-300";
  } else if (remaining === 1) {
    barClass = "bg-gradient-to-r from-gray-300 to-orange-200";
    barStyle = { filter: "grayscale(0.5) brightness(0.95)" };
  } else {
    barClass = "bg-gray-200";
    barStyle = { filter: "grayscale(1) brightness(0.8)" };
  }

  const handleLogout = async () => {
    if (session) {
      await signOut({ redirect: false });
    }
    localStorage.removeItem("guestRemainingAttempts");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex flex-col justify-between pb-24">
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6 relative w-full">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-4 sm:p-6 flex flex-col gap-6 relative">
          {/* Subs Now CTA */}
          <a
            href="#"
            className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow transition-colors z-10"
          >
            Subs Now!
          </a>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Hesabım</h2>

          {session ? (
            <>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-bold">
                    {session.user.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">
                    {session.user.name || "Kullanıcı"}
                  </h3>
                  <p className="text-sm text-blue-600">{session.user.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-xl py-3 transition-colors"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              {/* Kalan hak barı */}
              <div className="w-full bg-blue-50 rounded-lg h-4 flex items-center mb-2 relative overflow-hidden">
                <div
                  className={`${barClass} h-4 rounded-lg transition-all`}
                  style={{
                    width: `${(remaining / total) * 100}%`,
                    ...barStyle,
                  }}
                ></div>
                <span className="absolute left-1/2 -translate-x-1/2 text-xs text-blue-900 font-semibold z-10">
                  Kalan hakkınız: {remaining}/{total}
                </span>
              </div>

              {/* Giriş yap butonu */}
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl py-3 transition-colors"
              >
                Giriş Yap
              </button>
              <p className="text-blue-500 text-sm text-center mt-2">
                Giriş yapmadan da uygulamayı gezebilirsiniz. Daha fazla hak için
                abone olun!
              </p>
            </>
          )}
        </div>
      </main>
      <TabBar active="account" />
    </div>
  );
}
