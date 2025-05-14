"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TabBar from "../components/TabBar";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Analysis() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu 5MB'dan küçük olmalıdır.");
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith("image/")) {
      setError("Lütfen geçerli bir resim dosyası seçin.");
      return;
    }

    setError(null);
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError("Lütfen bir fotoğraf seçin.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // API anahtarını kontrol et
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin."
        );
      }

      // Gemini API'yi başlat
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Resmi base64'e çevir
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
      });
      reader.readAsDataURL(selectedImage);
      const base64Image = await base64Promise;

      // API isteği için yapılandırma
      const generationConfig = {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 1024,
      };

      // API isteği
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Bu cilt fotoğrafını analiz et ve aşağıdaki formatta yanıt ver:\n\nCilt Sorunları:\n- [Sorun 1]\n- [Sorun 2]\n\nÖneriler:\n- [Öneri 1]\n- [Öneri 2]\n\nÜrün Önerileri:\n- [Ürün 1]\n- [Ürün 2]\n\nLütfen her bölüm için en az 2 madde ekle ve ürün önerilerini gerçek cilt bakım ürünleri olarak ver.",
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
        generationConfig,
      });

      const response = await result.response;
      const analysisText = response.text();

      // Analiz sonucunu parse et
      const skinIssues = [];
      const recommendations = [];
      const productRecommendations = [];

      let currentSection = "";
      const lines = analysisText.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.includes("Cilt Sorunları:")) {
          currentSection = "issues";
        } else if (line.includes("Öneriler:")) {
          currentSection = "recommendations";
        } else if (line.includes("Ürün Önerileri:")) {
          currentSection = "products";
        } else if (line.startsWith("-")) {
          const content = line.substring(1).trim();
          if (content) {
            switch (currentSection) {
              case "issues":
                skinIssues.push(content);
                break;
              case "recommendations":
                recommendations.push(content);
                break;
              case "products":
                productRecommendations.push(content);
                break;
            }
          }
        }
      }

      // Eğer ürün önerileri boşsa, varsayılan öneriler ekle
      if (productRecommendations.length === 0) {
        productRecommendations.push(
          "Niacinamide 10% + Zinc 1% Serum",
          "Hyaluronic Acid 2% + B5 Serum",
          "Salicylic Acid 2% Solution",
          "Azelaic Acid Suspension 10%"
        );
      }

      // Sonucu localStorage'a kaydet
      const userId = session?.user?.id || "guest";
      const savedAnalyses = localStorage.getItem(`skinAnalyses_${userId}`);
      const analyses = savedAnalyses ? JSON.parse(savedAnalyses) : [];

      const newAnalysis = {
        id: Date.now(),
        date: new Date().toISOString(),
        imageUrl: previewUrl,
        skinIssues,
        recommendations,
        productRecommendations,
      };

      analyses.unshift(newAnalysis);
      localStorage.setItem(`skinAnalyses_${userId}`, JSON.stringify(analyses));

      // Sonuç sayfasına yönlendir
      router.push(`/result/${newAnalysis.id}`);
    } catch (error) {
      console.error("Analiz hatası:", error);
      setError(
        error.message ===
          "API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin."
          ? error.message
          : "Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-transparent">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
            Cilt Analizi
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col items-center">
              {previewUrl ? (
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    src={previewUrl}
                    alt="Seçilen fotoğraf"
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Fotoğraf seçilmedi</p>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl py-4 transition-colors"
              >
                {previewUrl ? "Fotoğrafı Değiştir" : "Fotoğraf Seç"}
              </button>
            </div>

            <button
              onClick={analyzeImage}
              disabled={!selectedImage || isAnalyzing}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl py-4 transition-colors ${
                (!selectedImage || isAnalyzing) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {isAnalyzing ? "Analiz Yapılıyor..." : "Analiz Et"}
            </button>
          </div>
        </div>
      </main>
      <TabBar active="analysis" />
    </div>
  );
}
