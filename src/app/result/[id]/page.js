"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TabBar from "../../components/TabBar";

export default function ResultPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalysis = () => {
      try {
        const userId = session?.user?.id || "guest";
        const savedAnalyses = localStorage.getItem(`skinAnalyses_${userId}`);

        if (!savedAnalyses) {
          router.push("/analysis");
          return;
        }

        const analyses = JSON.parse(savedAnalyses);
        const currentAnalysis = analyses.find(
          (a) => a.id.toString() === params.id
        );

        if (!currentAnalysis) {
          router.push("/analysis");
          return;
        }

        setAnalysis(currentAnalysis);
      } catch (error) {
        console.error("Analiz yükleme hatası:", error);
        router.push("/analysis");
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [params.id, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-900">Analiz Sonucu</h1>
            <Link
              href="/analysis"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Yeni Analiz
            </Link>
          </div>

          <div className="relative w-full aspect-square mb-6">
            <Image
              src={analysis.imageUrl}
              alt="Analiz edilen fotoğraf"
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <div className="space-y-6">
            {/* Cilt Sorunları */}
            <div className="bg-red-50 p-4 rounded-xl">
              <h2 className="font-semibold text-red-900 mb-3">
                Tespit Edilen Sorunlar
              </h2>
              <ul className="space-y-2">
                {analysis.skinIssues.map((issue, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-red-800">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Öneriler */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h2 className="font-semibold text-blue-900 mb-3">Öneriler</h2>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-blue-800">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ürün Önerileri */}
            <div className="bg-green-50 p-4 rounded-xl">
              <h2 className="font-semibold text-green-900 mb-3">
                Önerilen Ürünler
              </h2>
              <ul className="space-y-2">
                {analysis.productRecommendations.map((product, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-green-800">{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              href="/history"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-semibold rounded-xl py-3 transition-colors"
            >
              Geçmişe Dön
            </Link>
            <Link
              href="/analysis"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-xl py-3 transition-colors"
            >
              Yeni Analiz
            </Link>
          </div>
        </div>
      </main>
      <TabBar active="analysis" />
    </div>
  );
}
