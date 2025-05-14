import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { analyzeSkinImage } from "@/app/utils/gemini";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const { imageData } = await req.json();

    // Gemini API ile analiz yap
    const analysisResult = await analyzeSkinImage(imageData);

    // Analizi veritabanına kaydet
    const analysis = await prisma.analysis.create({
      data: {
        userId: session.user.id,
        imageUrl: imageData, // Base64 formatında saklıyoruz
        skinIssues: JSON.stringify(analysisResult.skinIssues),
        recommendations: JSON.stringify(analysisResult.recommendations),
      },
    });

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Analiz hatası:", error);
    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    // Kullanıcının analizlerini getir
    const analyses = await prisma.analysis.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Son 10 analizi getir
    });

    // JSON string'leri parse et
    const formattedAnalyses = analyses.map((analysis) => ({
      ...analysis,
      skinIssues: JSON.parse(analysis.skinIssues),
      recommendations: JSON.parse(analysis.recommendations),
    }));

    return NextResponse.json(formattedAnalyses);
  } catch (error) {
    console.error("Analiz getirme hatası:", error);
    return NextResponse.json(
      { error: "Analizler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
