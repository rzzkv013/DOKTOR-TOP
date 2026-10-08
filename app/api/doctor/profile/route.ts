import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getAuthenticatedDoctorId } from "@/lib/doctor-auth";
import { doctorProfileInclude, isValidWebUrl, toPublicDoctor } from "@/lib/doctor-data";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
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
  const data: Prisma.DoctorAccountUpdateInput = {};
  const stringFields = [
    ["name", 2, 100],
    ["specialty", 1, 80],
    ["clinic", 1, 120],
    ["location", 1, 100],
    ["address", 0, 200],
    ["bio", 0, 2000],
  ] as const;

  for (const [field, minimum, maximum] of stringFields) {
    const value = input[field];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.trim().length < minimum || value.trim().length > maximum) {
      return NextResponse.json({ error: `${field} maydoni noto‘g‘ri.` }, { status: 400 });
    }
    data[field] = value.trim();
  }

  if (input.experience !== undefined) {
    const experience = Number(input.experience);
    if (!Number.isInteger(experience) || experience < 0 || experience > 70) {
      return NextResponse.json({ error: "Ish tajribasi 0–70 yil oralig‘ida bo‘lishi kerak." }, { status: 400 });
    }
    data.experience = experience;
  }
  if (input.price !== undefined) {
    const price = Number(input.price);
    if (!Number.isInteger(price) || price < 0 || price > 100000000) {
      return NextResponse.json({ error: "Qabul narxi noto‘g‘ri." }, { status: 400 });
    }
    data.price = price;
  }
  if (input.image !== undefined) {
    if (typeof input.image !== "string" || (input.image.trim() && !isValidWebUrl(input.image.trim()))) {
      return NextResponse.json({ error: "Profil rasmi uchun http(s) havolasini kiriting." }, { status: 400 });
    }
    data.image = input.image.trim();
  }
  for (const field of ["languages", "certifications"] as const) {
    if (input[field] === undefined) continue;
    if (
      !Array.isArray(input[field]) ||
      input[field].length > 20 ||
      input[field].some((value) => typeof value !== "string" || value.length > 160)
    ) {
      return NextResponse.json({ error: `${field} ro‘yxati noto‘g‘ri.` }, { status: 400 });
    }
    data[field] = input[field].map((value: string) => value.trim()).filter(Boolean);
  }
  if (input.schedule !== undefined) {
    if (
      !Array.isArray(input.schedule) ||
      input.schedule.length > 14 ||
      input.schedule.some(
        (entry) =>
          !entry ||
          typeof entry !== "object" ||
          !("day" in entry) ||
          !("hours" in entry) ||
          typeof entry.day !== "string" ||
          typeof entry.hours !== "string" ||
          entry.day.length > 80 ||
          entry.hours.length > 40,
      )
    ) {
      return NextResponse.json({ error: "Ish vaqti jadvali noto‘g‘ri." }, { status: 400 });
    }
    data.schedule = input.schedule as Prisma.InputJsonValue;
  }

  try {
    const doctor = await prisma.doctorAccount.update({
      where: { id: doctorId },
      data,
      include: doctorProfileInclude,
    });
    return NextResponse.json({
      doctor: { ...toPublicDoctor(doctor), email: doctor.email },
    });
  } catch (error) {
    console.error("[api/doctor/profile] Profile update failed:", error);
    return NextResponse.json({ error: "Profilni saqlashda server xatosi." }, { status: 503 });
  }
}
