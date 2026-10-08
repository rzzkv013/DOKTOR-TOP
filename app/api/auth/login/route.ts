import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createDoctorSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/doctor-auth";
import { doctorProfileInclude, toPublicDoctor } from "@/lib/doctor-data";
import { prisma } from "@/lib/prisma";

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

  const input = body as Record<string, unknown>;
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "Email va parolni kiriting." }, { status: 400 });
  }

  try {
    const doctor = await prisma.doctorAccount.findUnique({
      where: { email },
      include: doctorProfileInclude,
    });
    if (!doctor || !(await bcrypt.compare(password, doctor.passwordHash))) {
      return NextResponse.json({ error: "Email yoki parol noto‘g‘ri." }, { status: 401 });
    }

    const token = await createDoctorSession(doctor.id);
    const response = NextResponse.json({
      doctor: { ...toPublicDoctor(doctor), email: doctor.email },
    });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("[api/auth/login] Doctor login failed:", error);
    return NextResponse.json(
      { error: "Kirishda server xatosi. DATABASE_URL va AUTH_SECRET sozlamalarini tekshiring." },
      { status: 503 },
    );
  }
}
