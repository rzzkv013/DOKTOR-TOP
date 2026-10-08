import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DoctorProfile } from "@/components/doctor-profile";
import { SiteHeader } from "@/components/site-header";
import { doctors, getDoctorById } from "@/lib/doctors";

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
    title: `${doctor.name} — ${doctor.specialtyUz} | Medora`,
    description: doctor.bio,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6fbfa]">
      <div aria-hidden="true" className="ambient ambient-one" />
      <div aria-hidden="true" className="floating-pill floating-pill-one" />
      <SiteHeader />
      <DoctorProfile doctor={doctor} />
    </main>
  );
}
