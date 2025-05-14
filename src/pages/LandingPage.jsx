import React from "react";

const LandingPage = () => {
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
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 32,
          boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          maxWidth: 1100,
          width: "100%",
          padding: 56,
          gap: 56,
        }}
      >
        <div style={{ flex: 1, minWidth: 340 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="8" fill="#f3f4f6" />
              <path
                d="M12 6v6l4 2"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ color: "#6366f1", fontWeight: 600, fontSize: 18 }}>
              AI-Powered
            </span>
          </div>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: "#18181b",
              marginBottom: 20,
            }}
          >
            Discover Personalized Skincare
            <br />
            with AI-Powered Face Analysis
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "#52525b",
              marginBottom: 38,
              fontWeight: 500,
            }}
          >
            Upload your photo and get customized product recommendations for
            your skin type.
          </p>
          <div style={{ display: "flex", gap: 20, marginBottom: 44 }}>
            <button
              style={{
                background: "#6366f1",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                padding: "18px 38px",
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(99,102,241,0.10)",
                transition: "background 0.2s",
              }}
            >
              Start Your Free Analysis
            </button>
            <button
              style={{
                background: "#fff",
                color: "#6366f1",
                fontSize: 20,
                fontWeight: 700,
                padding: "18px 38px",
                border: "2px solid #e0e7ef",
                borderRadius: 14,
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(99,102,241,0.04)",
                transition: "border 0.2s",
              }}
            >
              Sign Up Now
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} style={{ color: "#FFD600", fontSize: 24 }}>
                    ★
                  </span>
                ))}
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#18181b" }}>
              4.8/5
            </span>
            <span style={{ color: "#71717a", fontSize: 18 }}>
              from 15,000+ users
            </span>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: 28,
              boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
              padding: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/landing-face.png"
              alt="skin analysis"
              style={{
                width: 340,
                height: 420,
                objectFit: "cover",
                borderRadius: 22,
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                background: "#e5e7eb",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 32,
          bottom: 32,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#fff",
          color: "#6366f1",
          border: "none",
          fontSize: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(99,102,241,0.10)",
          cursor: "pointer",
        }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
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
};

export default LandingPage;
