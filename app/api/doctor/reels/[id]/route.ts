import { NextResponse } from "next/server";
import { getAuthenticatedDoctorId } from "@/lib/doctor-auth";
import { prisma } from "@/lib/prisma";

type ReelRouteProps = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, { params }: ReelRouteProps) {
  const doctorId = await getAuthenticatedDoctorId();
  if (!doctorId) return NextResponse.json({ error: "Tizimga kiring." }, { status: 401 });
  const { id } = await params;

  try {
    const result = await prisma.doctorReel.deleteMany({
      where: { id, doctorId },
    });
    if (result.count === 0) {
      return NextResponse.json({ error: "Video topilmadi." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/doctor/reels] Reel deletion failed:", error);
    return NextResponse.json({ error: "Videoni o‘chirishda server xatosi." }, { status: 503 });
  }
}
