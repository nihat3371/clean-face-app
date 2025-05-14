import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { analyzeSkinImage } from "@/app/utils/gemini";
import { db } from "@/app/utils/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

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

    // Analizi Firestore'a kaydet
    const analysisRef = await addDoc(collection(db, "analyses"), {
      userId: session.user.id,
      imageUrl: imageData,
      skinIssues: analysisResult.skinIssues,
      recommendations: analysisResult.recommendations,
      createdAt: new Date().toISOString(),
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
    const analysesQuery = query(
      collection(db, "analyses"),
      where("userId", "==", session.user.id),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const querySnapshot = await getDocs(analysesQuery);
    const analyses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(analyses);
  } catch (error) {
    console.error("Analiz getirme hatası:", error);
    return NextResponse.json(
      { error: "Analizler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
