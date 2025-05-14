"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f3f4f6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? 0 : undefined,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: isMobile ? 0 : 32,
          boxShadow: isMobile ? "none" : "0 8px 40px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          maxWidth: isMobile ? "100vw" : 1100,
          width: "100%",
          padding: isMobile ? 16 : 56,
          gap: isMobile ? 24 : 56,
        }}
      >
        <div style={{ flex: 1, minWidth: isMobile ? "auto" : 340 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: isMobile ? 18 : 32,
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <svg
              width={isMobile ? 22 : 28}
              height={isMobile ? 22 : 28}
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" rx="8" fill="#f3f4f6" />
              <path
                d="M12 6v6l4 2"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                color: "#6366f1",
                fontWeight: 600,
                fontSize: isMobile ? 15 : 18,
              }}
            >
              AI-Powered
            </span>
          </div>
          <h1
            style={{
              fontSize: isMobile ? 26 : 44,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: "#18181b",
              marginBottom: isMobile ? 12 : 20,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Discover Personalized Skincare
            <br />
            with AI-Powered Face Analysis
          </h1>
          <p
            style={{
              fontSize: isMobile ? 15 : 22,
              color: "#52525b",
              marginBottom: isMobile ? 22 : 38,
              fontWeight: 500,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Upload your photo and get customized product recommendations for
            your skin type.
          </p>
          <div
            style={{
              display: "flex",
              gap: isMobile ? 10 : 20,
              marginBottom: isMobile ? 24 : 44,
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "flex-start",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <button
              style={{
                background: "#6366f1",
                color: "#fff",
                fontSize: isMobile ? 16 : 20,
                fontWeight: 700,
                padding: isMobile ? "12px 20px" : "18px 38px",
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(99,102,241,0.10)",
                transition: "background 0.2s",
                width: isMobile ? "100%" : undefined,
                minWidth: isMobile ? 180 : undefined,
              }}
              onClick={() => router.push("/analysis")}
            >
              Start Your Free Analysis
            </button>
            <button
              style={{
                background: "#fff",
                color: "#6366f1",
                fontSize: isMobile ? 16 : 20,
                fontWeight: 700,
                padding: isMobile ? "12px 20px" : "18px 38px",
                border: "2px solid #e0e7ef",
                borderRadius: 14,
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(99,102,241,0.04)",
                transition: "border 0.2s",
                width: isMobile ? "100%" : undefined,
                minWidth: isMobile ? 180 : undefined,
              }}
              onClick={() => router.push("/register")}
            >
              Sign Up Now
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 8 : 16,
              marginTop: isMobile ? 8 : 12,
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    style={{ color: "#FFD600", fontSize: isMobile ? 18 : 24 }}
                  >
                    ★
                  </span>
                ))}
            </div>
            <span
              style={{
                fontSize: isMobile ? 15 : 20,
                fontWeight: 700,
                color: "#18181b",
              }}
            >
              4.8/5
            </span>
            <span style={{ color: "#71717a", fontSize: isMobile ? 13 : 18 }}>
              from 15,000+ users
            </span>
            <svg
              width={isMobile ? 16 : 22}
              height={isMobile ? 16 : 22}
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" rx="8" fill="#f3f4f6" />
              <path
                d="M8 13l4 4 4-4M12 17V7"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/landing-face.png"
            alt="skin analysis"
            width={1024}
            height={1536}
            style={{
              objectFit: "cover",
              borderRadius: isMobile ? 18 : 32,
              boxShadow: isMobile
                ? "0 2px 8px rgba(0,0,0,0.10)"
                : "0 4px 32px rgba(0,0,0,0.10)",
              background: "#EAF4FB",
              display: "block",
              width: isMobile ? "90vw" : 1024,
              height: isMobile ? "60vw" : 1536,
              maxWidth: isMobile ? 400 : 1024,
              maxHeight: isMobile ? 500 : 1536,
              margin: isMobile ? "0 auto" : undefined,
            }}
          />
          <div
            style={{
              marginTop: isMobile ? 32 : 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.55,
            }}
          >
            <span
              style={{
                fontSize: isMobile ? 15 : 20,
                color: "#64748b",
                fontWeight: 500,
                letterSpacing: 0.2,
                textAlign: "center",
                marginRight: 12,
              }}
            >
              Continue as a guest
            </span>
            <button
              onClick={() => router.push("/analysis")}
              style={{
                background: "#e5e7eb",
                border: "none",
                borderRadius: "50%",
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                opacity: 0.7,
                transition: "opacity 0.2s",
                marginLeft: 2,
              }}
            >
              <svg
                width={isMobile ? 16 : 22}
                height={isMobile ? 16 : 22}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: isMobile ? 12 : 32,
          bottom: isMobile ? 12 : 32,
          width: isMobile ? 40 : 54,
          height: isMobile ? 40 : 54,
          borderRadius: "50%",
          background: "#fff",
          color: "#6366f1",
          border: "none",
          fontSize: isMobile ? 22 : 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(99,102,241,0.10)",
          cursor: "pointer",
        }}
      >
        <svg
          width={isMobile ? 18 : 28}
          height={isMobile ? 18 : 28}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 19l-7-7 7-7"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
