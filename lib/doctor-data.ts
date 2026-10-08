import type { DoctorAccount, DoctorReel } from "@prisma/client";
import type { Doctor } from "@/lib/doctors";

export type DoctorWithReels = DoctorAccount & { reels: DoctorReel[] };

export function toPublicDoctor(account: DoctorWithReels): Doctor {
  const schedule = Array.isArray(account.schedule)
    ? account.schedule.flatMap((entry) => {
        if (
          typeof entry === "object" &&
          entry !== null &&
          "day" in entry &&
          "hours" in entry &&
          typeof entry.day === "string" &&
          typeof entry.hours === "string"
        ) {
          return [{ day: entry.day, hours: entry.hours }];
        }
        return [];
      })
    : [];

  return {
    id: account.id,
    name: account.name,
    specialty: account.specialty,
    specialtyUz: account.specialty,
    experience: account.experience,
    rating: 0,
    reviewCount: 0,
    price: account.price,
    clinic: account.clinic,
    location: account.location,
    address: account.address,
    image:
      account.image ||
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85",
    bio: account.bio,
    languages: account.languages,
    schedule,
    certifications: account.certifications,
    reels: account.reels.map((reel) => ({
      id: reel.id,
      title: reel.title,
      category: reel.category,
      cover: reel.coverUrl,
      video: reel.videoUrl,
      views: reel.views.toString(),
      duration: "",
    })),
  };
}

export const doctorProfileInclude = {
  reels: { orderBy: { createdAt: "desc" as const } },
};

export function isValidWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
