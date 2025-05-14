import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email ve şifre gereklidir");
          }

          // API'den kullanıcı bilgilerini al
          const response = await fetch(
            `${
              process.env.NEXTAUTH_URL || "http://localhost:3000"
            }/api/users?email=${encodeURIComponent(
              credentials.email
            )}&password=${encodeURIComponent(credentials.password)}`
          );

          if (!response.ok) {
            throw new Error("Geçersiz email veya şifre");
          }

          const user = await response.json();

          if (!user) {
            throw new Error("Geçersiz email veya şifre");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Kimlik doğrulama hatası:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
