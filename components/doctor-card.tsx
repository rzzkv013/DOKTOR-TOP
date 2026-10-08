import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import type { Doctor } from "@/lib/doctors";
import { formatPrice } from "@/lib/doctors";

type DoctorCardProps = {
  doctor: Doctor;
  index: number;
  onBook: (doctor: Doctor) => void;
};

export function DoctorCard({ doctor, index, onBook }: DoctorCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.38,
        delay: prefersReducedMotion ? 0 : index * 0.055,
        ease: [0.2, 0.7, 0.25, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              y: -4,
              boxShadow: "0 24px 55px rgba(16, 54, 61, 0.14)",
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      className="group overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_4px_24px_rgba(16,54,61,0.045)] transition-colors duration-300 hover:border-teal-100"
    >
      <Link
        href={`/doctors/${doctor.id}`}
        className="relative block h-[246px] overflow-hidden bg-teal-50"
        aria-label={`${doctor.name} profilini ko‘rish`}
      >
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 text-[11px] font-bold text-teal-800 shadow-sm backdrop-blur-md">
          {doctor.specialtyUz}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/60 bg-white/90 px-2.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md">
          {doctor.rating > 0 ? (
            <>
              <Star size={13} className="fill-amber-400 text-amber-400" />
              {doctor.rating.toFixed(1)}
            </>
          ) : (
            "Yangi"
          )}
        </span>
        <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/85 text-slate-700 opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </Link>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/doctors/${doctor.id}`}
              className="text-lg font-bold tracking-[-0.035em] text-slate-900 transition-colors hover:text-teal-700"
            >
              {doctor.name}
            </Link>
            <p className="mt-1 text-sm text-slate-500">
              {doctor.specialty} <span className="text-slate-300">·</span>{" "}
              {doctor.experience} yil tajriba
            </p>
          </div>
          <span className="shrink-0 pt-1 text-xs text-slate-400">
            {doctor.reviewCount} sharh
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={15} className="shrink-0 text-teal-600" />
          <span className="truncate">
            {doctor.clinic}, {doctor.location}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Qabul narxi</p>
            <p className="mt-0.5 text-base font-bold text-slate-900">
              {formatPrice(doctor.price)}{" "}
              <span className="text-xs font-medium text-slate-500">so‘m</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onBook(doctor)}
            className="rounded-full bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-teal-700/15 transition-all hover:-translate-y-0.5 hover:bg-teal-800 active:scale-95 sm:px-5 sm:text-sm"
          >
            Qabulga yozilish
          </button>
        </div>
      </div>
    </motion.article>
  );
}
