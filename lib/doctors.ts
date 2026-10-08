export type DoctorReel = {
  id: string;
  title: string;
  category: string;
  cover: string;
  video: string;
  views: string;
  duration: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyUz: string;
  experience: number;
  rating: number;
  reviewCount: number;
  verified?: boolean;
  price: number;
  clinic: string;
  location: string;
  address: string;
  image: string;
  bio: string;
  languages: string[];
  schedule: { day: string; hours: string }[];
  certifications: string[];
  reels: DoctorReel[];
};

const sampleVideo =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const doctors: Doctor[] = [
  {
    id: "amira-karimova",
    verified: true,
    name: "Amira Karimova",
    specialty: "Cardiologist",
    specialtyUz: "Kardiolog",
    experience: 12,
    rating: 4.9,
    reviewCount: 128,
    price: 180000,
    clinic: "Medion Family Hospital",
    location: "Tashkent",
    address: "Shota Rustaveli ko‘chasi, 65",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85",
    bio: "Yurak salomatligi va profilaktik kardiologiya bo‘yicha 12 yillik tajribaga ega shifokor. Har bir bemor uchun aniq tashxis va qulay davolash rejasini tuzishga e’tibor beradi.",
    languages: ["O‘zbek", "Русский", "English"],
    schedule: [
      { day: "Dushanba – Juma", hours: "09:00 – 17:00" },
      { day: "Shanba", hours: "09:00 – 13:00" },
    ],
    certifications: [
      "Toshkent Tibbiyot Akademiyasi, kardiologiya",
      "European Society of Cardiology — klinik kardiologiya",
      "EKG va exokardiografiya bo‘yicha sertifikat",
    ],
    reels: [
      {
        id: "heart-health",
        title: "Yurakni sog‘lom saqlashning 3 yo‘li",
        category: "Yurak salomatligi",
        cover:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "2,4 ming",
        duration: "0:32",
      },
      {
        id: "blood-pressure",
        title: "Qon bosimini to‘g‘ri o‘lchash",
        category: "Foydali maslahat",
        cover:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "1,8 ming",
        duration: "0:45",
      },
      {
        id: "heart-check",
        title: "Qachon kardiologga murojaat qilish kerak?",
        category: "Savol-javob",
        cover:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "3,1 ming",
        duration: "0:28",
      },
    ],
  },
  {
    id: "jasur-rahimov",
    verified: true,
    name: "Jasur Rahimov",
    specialty: "Dentist",
    specialtyUz: "Stomatolog",
    experience: 9,
    rating: 4.8,
    reviewCount: 96,
    price: 120000,
    clinic: "Smile Studio",
    location: "Tashkent",
    address: "Amir Temur shoh ko‘chasi, 107",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85",
    bio: "Zamonaviy stomatologiya va estetik restavratsiya mutaxassisi. Bemorlar bilan samimiy muloqot va og‘riqsiz davolashni birinchi o‘ringa qo‘yadi.",
    languages: ["O‘zbek", "Русский"],
    schedule: [
      { day: "Dushanba – Juma", hours: "10:00 – 18:00" },
      { day: "Shanba", hours: "10:00 – 15:00" },
    ],
    certifications: [
      "Toshkent Davlat Stomatologiya Instituti",
      "Estetik restavratsiya va keramika vinirlar",
      "Raqamli stomatologiya bo‘yicha amaliy kurs",
    ],
    reels: [
      {
        id: "daily-smile",
        title: "To‘g‘ri tish yuvish usuli",
        category: "Tish parvarishi",
        cover:
          "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "4,2 ming",
        duration: "0:36",
      },
      {
        id: "dental-check",
        title: "Profilaktik ko‘rik nega muhim?",
        category: "Foydali maslahat",
        cover:
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "2,1 ming",
        duration: "0:41",
      },
    ],
  },
  {
    id: "dilnoza-yusupova",
    verified: true,
    name: "Dilnoza Yusupova",
    specialty: "Neurologist",
    specialtyUz: "Nevrolog",
    experience: 15,
    rating: 5.0,
    reviewCount: 204,
    price: 200000,
    clinic: "Hayat Medical Centre",
    location: "Tashkent",
    address: "Afrosiyob ko‘chasi, 12",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
    bio: "Asab tizimi kasalliklari va bosh og‘rig‘i bo‘yicha tajribali nevrolog. Dalillarga asoslangan tibbiyot va bemor bilan individual ishlashga ixtisoslashgan.",
    languages: ["O‘zbek", "Русский", "English"],
    schedule: [
      { day: "Dushanba – Payshanba", hours: "08:30 – 16:30" },
      { day: "Juma", hours: "09:00 – 14:00" },
    ],
    certifications: [
      "Toshkent Tibbiyot Akademiyasi, nevrologiya",
      "Bosh og‘rig‘i va migren bo‘yicha xalqaro kurs",
      "Nevrologik reabilitatsiya sertifikati",
    ],
    reels: [
      {
        id: "migraine",
        title: "Migrenni oddiy bosh og‘rig‘idan farqlash",
        category: "Nevrolog maslahati",
        cover:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "5,6 ming",
        duration: "0:52",
      },
      {
        id: "sleep",
        title: "Sog‘lom uyqu uchun 3 odat",
        category: "Sog‘lom turmush",
        cover:
          "https://images.unsplash.com/photo-1511295742362-92c96b9d9c41?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "3,7 ming",
        duration: "0:39",
      },
    ],
  },
  {
    id: "madina-azizova",
    verified: true,
    name: "Madina Azizova",
    specialty: "Pediatrician",
    specialtyUz: "Pediatr",
    experience: 11,
    rating: 4.9,
    reviewCount: 142,
    price: 150000,
    clinic: "Happy Kids Clinic",
    location: "Tashkent",
    address: "Buyuk Ipak Yo‘li ko‘chasi, 45",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
    bio: "Bolalar salomatligi va rivojlanishini mehr bilan kuzatib boradigan pediatr. Ota-onalarga bolaning har bir yosh davrida kerakli parvarish haqida tushunarli maslahat beradi.",
    languages: ["O‘zbek", "Русский"],
    schedule: [
      { day: "Dushanba – Juma", hours: "09:00 – 17:30" },
      { day: "Shanba", hours: "09:00 – 12:00" },
    ],
    certifications: [
      "Toshkent Pediatriya Tibbiyot Instituti",
      "Bolalar kasalliklari va emlash bo‘yicha sertifikat",
      "Birinchi yordam — pediatrik yo‘nalish",
    ],
    reels: [
      {
        id: "kids-fever",
        title: "Bolada isitma chiqqanda nima qilish kerak?",
        category: "Ota-onalar uchun",
        cover:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "6,2 ming",
        duration: "0:48",
      },
      {
        id: "baby-sleep",
        title: "Chaqaloq uyqusi haqida",
        category: "Bola salomatligi",
        cover:
          "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "3,3 ming",
        duration: "0:34",
      },
    ],
  },
  {
    id: "bekzod-umarov",
    verified: true,
    name: "Bekzod Umarov",
    specialty: "Dermatologist",
    specialtyUz: "Dermatolog",
    experience: 8,
    rating: 4.7,
    reviewCount: 73,
    price: 130000,
    clinic: "Derma Life",
    location: "Tashkent",
    address: "Shahrisabz ko‘chasi, 23",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85",
    bio: "Teri salomatligi, allergik va surunkali dermatologik holatlar bo‘yicha shifokor. Muammoning sababini aniqlash va parvarish bo‘yicha amaliy tavsiyalar berishga e’tibor qaratadi.",
    languages: ["O‘zbek", "Русский"],
    schedule: [
      { day: "Dushanba – Juma", hours: "10:00 – 18:00" },
      { day: "Shanba", hours: "10:00 – 14:00" },
    ],
    certifications: [
      "Toshkent Tibbiyot Akademiyasi, dermatovenerologiya",
      "Klinik dermatologiya va dermatoskopiya",
      "Allergik teri kasalliklari bo‘yicha kurs",
    ],
    reels: [
      {
        id: "skin-care",
        title: "Yozda terini qanday himoya qilish kerak?",
        category: "Teri parvarishi",
        cover:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "2,8 ming",
        duration: "0:43",
      },
      {
        id: "spf",
        title: "SPF kremni to‘g‘ri tanlash",
        category: "Dermatolog tavsiyasi",
        cover:
          "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "1,9 ming",
        duration: "0:31",
      },
    ],
  },
  {
    id: "sarvar-tursunov",
    verified: true,
    name: "Sarvar Tursunov",
    specialty: "Ophthalmologist",
    specialtyUz: "Oftalmolog",
    experience: 14,
    rating: 4.8,
    reviewCount: 119,
    price: 160000,
    clinic: "Vision Plus",
    location: "Tashkent",
    address: "Navoiy ko‘chasi, 18",
    image:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=900&q=85",
    bio: "Ko‘z kasalliklari va ko‘rish diagnostikasi bo‘yicha oftalmolog. Zamonaviy tekshiruv usullari orqali ko‘z salomatligini erta bosqichda asrashga yordam beradi.",
    languages: ["O‘zbek", "Русский", "English"],
    schedule: [
      { day: "Dushanba – Juma", hours: "08:00 – 16:00" },
      { day: "Shanba", hours: "08:00 – 12:00" },
    ],
    certifications: [
      "Toshkent Tibbiyot Akademiyasi, oftalmologiya",
      "Ko‘z diagnostikasi va optik koherens tomografiya",
      "Katarakta bo‘yicha xalqaro malaka oshirish",
    ],
    reels: [
      {
        id: "screen-time",
        title: "Ko‘zlarni ekran charchog‘idan asrang",
        category: "Ko‘z salomatligi",
        cover:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "3,5 ming",
        duration: "0:40",
      },
      {
        id: "eye-check",
        title: "Ko‘rishni qachon tekshirtirish kerak?",
        category: "Foydali maslahat",
        cover:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=85",
        video: sampleVideo,
        views: "2,6 ming",
        duration: "0:35",
      },
    ],
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}

export function formatPrice(price: number): string {
  return Math.trunc(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
