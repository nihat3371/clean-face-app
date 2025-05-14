"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TabBar from "../components/TabBar";

export default function History() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalyses = () => {
      try {
        if (!session?.user?.id) {
          console.log("Kullanıcı oturumu bulunamadı");
          setAnalyses([]);
          setLoading(false);
          return;
        }

        const userId = session.user.id;
        console.log("Kullanıcı ID:", userId);

        // localStorage'dan analizleri al
        const savedAnalyses = localStorage.getItem(`skinAnalyses_${userId}`);
        console.log("Kaydedilmiş analizler:", savedAnalyses);

        if (savedAnalyses) {
          const parsedAnalyses = JSON.parse(savedAnalyses);
          // Tarihe göre sırala (en yeniden en eskiye)
          const sortedAnalyses = parsedAnalyses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          console.log("Sıralanmış analizler:", sortedAnalyses);
          setAnalyses(sortedAnalyses);
        } else {
          console.log("Kaydedilmiş analiz bulunamadı");
          setAnalyses([]);
        }
      } catch (error) {
        console.error("Geçmiş yükleme hatası:", error);
        setAnalyses([]);
      } finally {
        setLoading(false);
      }
    };

    if (status === "loading") {
      return;
    }

    loadAnalyses();
  }, [session, status]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-6">
            Analiz Geçmişi
          </h1>

          {analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Link
                  key={analysis.id}
                  href={`/result/${analysis.id}`}
                  className="block bg-white rounded-3xl shadow-lg p-4 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={analysis.imageUrl}
                        alt="Analiz fotoğrafı"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-blue-900 mb-1">
                        {formatDate(analysis.date)}
                      </h2>
                      <div className="text-sm text-blue-600">
                        {analysis.skinIssues.length} sorun tespit edildi
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {analysis.skinIssues.slice(0, 2).join(", ")}
                        {analysis.skinIssues.length > 2 && "..."}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-3xl shadow-lg">
              <p className="text-gray-500 mb-4">Henüz analiz yapılmamış</p>
              <Link href="/analysis" className="inline-block">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl py-3 px-6 transition-colors">
                  İlk Analizi Yap
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <TabBar active="history" />
    </div>
  );
}
