import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import {
  createDoctorSession,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/doctor-auth";
import { toPublicDoctor, doctorProfileInclude, isValidWebUrl } from "@/lib/doctor-data";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) {
    return NextResponse.json(
      { error: "Server sozlamasi to‘liq emas: AUTH_SECRET uchun kamida 32 belgi kiriting." },
      { status: 503 },
    );
  }

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
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  const specialty = typeof input.specialty === "string" ? input.specialty.trim() : "";
  const experience = Number(input.experience ?? 0);
  const clinic =
    typeof input.clinic === "string" && input.clinic.trim()
      ? input.clinic.trim()
      : "Mustaqil amaliyot";

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Ism 2–100 ta belgidan iborat bo‘lishi kerak." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "To‘g‘ri email manzilini kiriting." }, { status: 400 });
  }
  if (
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return NextResponse.json({ error: "Parol 8–72 ta belgidan iborat bo‘lishi kerak." }, { status: 400 });
  }
  if (!specialty || specialty.length > 80) {
    return NextResponse.json({ error: "Mutaxassislikni kiriting." }, { status: 400 });
  }
  if (!Number.isInteger(experience) || experience < 0 || experience > 70) {
    return NextResponse.json({ error: "Ish tajribasi 0–70 yil oralig‘ida bo‘lishi kerak." }, { status: 400 });
  }

  const image = typeof input.image === "string" ? input.image.trim() : "";
  if (image && !isValidWebUrl(image)) {
    return NextResponse.json({ error: "Profil rasmi uchun to‘g‘ri http(s) havolasini kiriting." }, { status: 400 });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const doctor = await prisma.doctorAccount.create({
      data: {
        email,
        passwordHash,
        name,
        specialty,
        experience,
        clinic: clinic.slice(0, 120),
        image,
      },
      include: doctorProfileInclude,
    });
    const token = await createDoctorSession(doctor.id);
    const response = NextResponse.json(
      { doctor: { ...toPublicDoctor(doctor), email: doctor.email } },
      { status: 201 },
    );
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Bu email allaqachon ro‘yxatdan o‘tgan." },
        { status: 409 },
      );
    }
    console.error("[api/auth/register] Doctor registration failed:", error);
    return NextResponse.json(
      { error: "Ro‘yxatdan o‘tishda server xatosi. DATABASE_URL sozlamasini tekshiring." },
      { status: 503 },
    );
  }
}
