import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API'yi başlat
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function analyzeSkinImage(imageData) {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("API anahtarı bulunamadı");
    }

    // Gemini 1.5 Flash modelini kullan
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Base64 formatındaki görüntüyü hazırla
    const imageParts = [
      {
        inlineData: {
          data: imageData,
          mimeType: "image/jpeg",
        },
      },
    ];

    // Prompt hazırla
    const prompt = `
      Bu bir cilt analizi görüntüsüdür. Lütfen aşağıdaki bilgileri analiz et ve SADECE JSON formatında döndür:
      1. Tespit edilen cilt sorunları (akne, kuruluk, kızarıklık vb.)
      2. Her sorun için önerilen ürünler ve açıklamaları
      
      Yanıtı TAM OLARAK şu formatta ver, başka hiçbir açıklama ekleme:
      {
        "skinIssues": ["sorun1", "sorun2"],
        "recommendations": [
          {
            "name": "ürün adı",
            "description": "ürün açıklaması"
          }
        ]
      }
    `;

    // API'yi çağır
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Yanıtı temizle ve JSON'a çevir
    try {
      // Yanıttaki olası markdown işaretlerini temizle
      const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
      const parsedResponse = JSON.parse(cleanText);

      // Yanıtın doğru formatta olduğunu kontrol et
      if (!parsedResponse.skinIssues || !parsedResponse.recommendations) {
        throw new Error("API yanıtı beklenen formatta değil");
      }

      // Yanıtı doğrula
      if (
        !Array.isArray(parsedResponse.skinIssues) ||
        !Array.isArray(parsedResponse.recommendations)
      ) {
        throw new Error("API yanıtı geçersiz format içeriyor");
      }

      return parsedResponse;
    } catch (parseError) {
      console.error("JSON Parse Hatası:", parseError);
      console.error("API Yanıtı:", text);
      throw new Error("API yanıtı işlenirken bir hata oluştu");
    }
  } catch (error) {
    console.error("Gemini API Hatası:", error);
    throw new Error(error.message || "Cilt analizi sırasında bir hata oluştu");
  }
}
