import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connection } from "next/server";
import { DoctorProfile } from "@/components/doctor-profile";
import { SiteHeader } from "@/components/site-header";
import { doctorProfileInclude, toPublicDoctor } from "@/lib/doctor-data";
import { doctors, getDoctorById } from "@/lib/doctors";
import { prisma } from "@/lib/prisma";

type DoctorPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return doctors.map((doctor) => ({ id: doctor.id }));
}

export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) return { title: "Shifokor topilmadi | Medora" };

  return {
    title: `${doctor.name} — ${doctor.specialtyUz}`,
    description: doctor.bio,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { id } = await params;
  let doctor = getDoctorById(id);

  if (!doctor && process.env.DATABASE_URL) {
    await connection();
    const account = await prisma.doctorAccount.findUnique({
      where: { id },
      include: doctorProfileInclude,
    });
    if (account) doctor = toPublicDoctor(account);
  }

  if (!doctor) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <div aria-hidden="true" className="ambient ambient-one" />
      <div aria-hidden="true" className="floating-pill floating-pill-one" />
      <SiteHeader />
      <DoctorProfile doctor={doctor} />
    </main>
  );
}
