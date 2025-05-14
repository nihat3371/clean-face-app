"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // URL'den hata mesajını al
    const error = searchParams.get("error");
    if (error) {
      setError(
        error === "CredentialsSignin"
          ? "Geçersiz email veya şifre"
          : "Giriş yapılırken bir hata oluştu"
      );
    }

    // Kayıt başarılı mesajını göster
    const registered = searchParams.get("registered");
    if (registered) {
      setError("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    }
  }, [searchParams]);

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    if (status === "authenticated") {
      router.push("/history");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/history",
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Geçersiz email veya şifre"
            : result.error
        );
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      setError("Giriş yapılırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // Guest kullanıcı için localStorage'da hak sayısını ayarla
    localStorage.setItem("guestRemainingAttempts", "3");
    router.push("/analysis");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
            Giriş Yap
          </h1>

          {error && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                error.includes("başarılı")
                  ? "bg-green-50 border border-green-200 text-green-600"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl py-3 transition-colors ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700"
              >
                Kayıt Ol
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
