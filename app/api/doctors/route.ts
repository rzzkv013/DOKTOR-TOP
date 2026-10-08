import { connection, NextResponse } from "next/server";
import { doctorProfileInclude, toPublicDoctor } from "@/lib/doctor-data";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await connection();
  try {
    const accounts = await prisma.doctorAccount.findMany({
      where: { bio: { not: "" } },
      include: doctorProfileInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ doctors: accounts.map(toPublicDoctor) });
  } catch (error) {
    console.error("[api/doctors] Public doctor list failed:", error);
    return NextResponse.json(
      { error: "Ro‘yxatdan o‘tgan shifokorlarni yuklab bo‘lmadi. DATABASE_URL sozlamasini tekshiring." },
      { status: 503 },
    );
  }
}
