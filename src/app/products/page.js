import Image from "next/image";
import TabBar from "../components/TabBar";

const products = [
  {
    name: "Rosacea Gel",
    desc: "Kızarıklık ve hassasiyet için özel formül.",
    img: "/product1.png",
    link: "https://kapatmlartitkl.co/rosacea-gel",
  },
  {
    name: "Niacinamide 10% + Zinc 1%",
    desc: "Cilt tonu eşitleyici ve gözenek sıkılaştırıcı serum.",
    img: "/product2.png",
    link: "https://siteorneagi.com/niacinamide-zinc",
  },
  {
    name: "Moisturizing Lotion",
    desc: "Yoğun nemlendirici ve yatıştırıcı losyon.",
    img: "/product3.png",
    link: "https://parnameo.merket/moisturizing-lotion",
  },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex flex-col justify-between pb-24">
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-4 sm:p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Ürünler</h2>
          {products.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-4 py-3 px-2 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer border-b border-blue-50 last:border-b-0"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-contain w-[60px] h-[60px]"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-blue-900 font-semibold text-base mb-1">
                  {item.name}
                </span>
                <span className="text-blue-500 text-sm">{item.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
      {/* TabBar */}
      <TabBar active="products" />
    </div>
  );
}
