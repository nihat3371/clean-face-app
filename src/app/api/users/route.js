import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

// Kullanıcı verilerini oku
function getUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      // data klasörünü oluştur
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      // Boş users.json dosyası oluştur
      fs.writeFileSync(USERS_FILE, "[]");
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Kullanıcı verileri okunamadı:", error);
    return [];
  }
}

// Kullanıcı verilerini kaydet
function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Kullanıcı verileri kaydedilemedi:", error);
  }
}

// GET: Kullanıcıları getir veya belirli bir kullanıcıyı doğrula
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    // Eğer email ve şifre parametreleri varsa, kullanıcı doğrulama yap
    if (email && password) {
      const users = getUsers();
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return NextResponse.json(
          { error: "Geçersiz email veya şifre" },
          { status: 401 }
        );
      }

      // Şifreyi çıkar ve kullanıcı bilgilerini döndür
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    // Email ve şifre parametreleri yoksa tüm kullanıcıları getir
    const users = getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Kullanıcı işlemi başarısız:", error);
    return NextResponse.json(
      { error: "Kullanıcı işlemi başarısız" },
      { status: 500 }
    );
  }
}

// POST: Yeni kullanıcı ekle
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Gerekli alanları kontrol et
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tüm alanlar gereklidir" },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçersiz email formatı" },
        { status: 400 }
      );
    }

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      );
    }

    const users = getUsers();

    // Email adresi kontrolü
    if (users.some((user) => user.email === email)) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayıtlı" },
        { status: 400 }
      );
    }

    // Yeni kullanıcı oluştur
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Gerçek uygulamada şifre hash'lenmelidir
      createdAt: new Date().toISOString(),
    };

    // Kullanıcıyı kaydet
    users.push(newUser);
    saveUsers(users);

    // Şifreyi çıkar ve kullanıcı bilgilerini döndür
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Kullanıcı kaydedilemedi:", error);
    return NextResponse.json(
      { error: "Kullanıcı kaydedilemedi" },
      { status: 500 }
    );
  }
}
