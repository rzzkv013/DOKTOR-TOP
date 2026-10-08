import { connection, NextResponse } from "next/server";
import { getAuthenticatedDoctorId } from "@/lib/doctor-auth";
import { doctorProfileInclude, toPublicDoctor } from "@/lib/doctor-data";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await connection();
  try {
    const doctorId = await getAuthenticatedDoctorId();
    if (!doctorId) {
      return NextResponse.json({ error: "Tizimga kiring." }, { status: 401 });
    }
    const doctor = await prisma.doctorAccount.findUnique({
      where: { id: doctorId },
      include: doctorProfileInclude,
    });
    if (!doctor) {
      return NextResponse.json({ error: "Doktor akkaunti topilmadi." }, { status: 404 });
    }
    return NextResponse.json({
      doctor: { ...toPublicDoctor(doctor), email: doctor.email },
    });
  } catch (error) {
    console.error("[api/auth/me] Session lookup failed:", error);
    return NextResponse.json({ error: "Akkauntni yuklashda server xatosi." }, { status: 503 });
  }
}
