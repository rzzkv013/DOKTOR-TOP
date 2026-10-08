import { connection, NextResponse } from "next/server";
import { getAuthenticatedDoctorId } from "@/lib/doctor-auth";
import { isValidWebUrl } from "@/lib/doctor-data";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await connection();
  const doctorId = await getAuthenticatedDoctorId();
  if (!doctorId) return NextResponse.json({ error: "Tizimga kiring." }, { status: 401 });

  try {
    const reels = await prisma.doctorReel.findMany({
      where: { doctorId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ reels });
  } catch (error) {
    console.error("[api/doctor/reels] Reel list failed:", error);
    return NextResponse.json({ error: "Videolarni yuklashda server xatosi." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "So‘rov ma’lumotlari noto‘g‘ri." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "So‘rov ma’lumotlari noto‘g‘ri." }, { status: 400 });
  }

  const doctorId = await getAuthenticatedDoctorId();
  if (!doctorId) return NextResponse.json({ error: "Tizimga kiring." }, { status: 401 });

  const input = body as Record<string, unknown>;
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const category = typeof input.category === "string" ? input.category.trim() : "Foydali maslahat";
  const coverUrl = typeof input.coverUrl === "string" ? input.coverUrl.trim() : "";
  const videoUrl = typeof input.videoUrl === "string" ? input.videoUrl.trim() : "";
  if (!title || title.length > 160) {
    return NextResponse.json({ error: "Video sarlavhasi 1–160 ta belgi bo‘lishi kerak." }, { status: 400 });
  }
  if (category.length > 80) {
    return NextResponse.json({ error: "Video kategoriyasi juda uzun." }, { status: 400 });
  }
  if (!isValidWebUrl(coverUrl) || !isValidWebUrl(videoUrl)) {
    return NextResponse.json({ error: "Video va muqova uchun http(s) havolalarini kiriting." }, { status: 400 });
  }

  try {
    const reel = await prisma.doctorReel.create({
      data: { doctorId, title, category, coverUrl, videoUrl },
    });
    return NextResponse.json({ reel }, { status: 201 });
  } catch (error) {
    console.error("[api/doctor/reels] Reel creation failed:", error);
    return NextResponse.json({ error: "Videoni saqlashda server xatosi." }, { status: 503 });
  }
}
