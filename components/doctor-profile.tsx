"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Play,
  Share2,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import type { Doctor, DoctorReel } from "@/lib/doctors";
import { formatPrice } from "@/lib/doctors";
import { AppointmentModal } from "@/components/appointment-modal";

type DoctorProfileProps = {
  doctor: Doctor;
};

export function DoctorProfile({ doctor }: DoctorProfileProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedReel, setSelectedReel] = useState<DoctorReel | null>(null);
  const [likedReels, setLikedReels] = useState<string[]>([]);
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [commentText, setCommentText] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [copied, setCopied] = useState(false);
  const reelComments = selectedReel
    ? (comments[selectedReel.id] ?? [
        "Juda foydali maslahat, rahmat! 💚",
        "Shunday videolarni ko‘proq ulashing.",
      ])
    : [];

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = commentText.trim();
    if (!selectedReel || !text) return;
    setComments((current) => ({
      ...current,
      [selectedReel.id]: [...(current[selectedReel.id] ?? reelComments), text],
    }));
    setCommentText("");
  }

  async function shareProfile() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Profil havolasini nusxalang:", window.location.href);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pt-10">
        <Link
          href="/#doctors"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-teal-800"
        >
          <ArrowLeft size={16} />
          Shifokorlar ro‘yxatiga qaytish
        </Link>

        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
          className="mt-5 overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_16px_55px_rgba(16,54,61,0.07)]"
        >
          <div className="profile-cover h-32 bg-gradient-to-r from-[#c6eee5] via-[#e3f5ef] to-[#f4faf7] sm:h-44">
            <div className="profile-cover-pattern h-full" />
          </div>
          <div className="px-5 pb-6 sm:px-9 sm:pb-8">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative size-28 shrink-0 overflow-hidden rounded-[25px] border-4 border-white bg-slate-100 shadow-lg sm:size-32">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    unoptimized
                    sizes="128px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-[-0.055em] text-slate-900 sm:text-[32px]">
                      {doctor.name}
                    </h1>
                    {doctor.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-800">
                        <ShieldCheck size={12} /> Tasdiqlangan
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-teal-700">
                    {doctor.specialtyUz}{" "}
                    <span className="text-slate-300">·</span>{" "}
                    {doctor.experience} yillik tajriba
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    {doctor.clinic}, {doctor.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:pb-1">
                <button
                  type="button"
                  onClick={shareProfile}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50"
                >
                  {copied ? <Check size={16} /> : <Share2 size={16} />}
                  <span>{copied ? "Nusxalandi" : "Ulashish"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(doctor)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-5 text-sm font-bold text-white shadow-md shadow-teal-700/15 transition-all hover:-translate-y-0.5 hover:bg-teal-800 active:scale-95"
                >
                  <CalendarDays size={16} />
                  Qabulga yozilish
                </button>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl bg-[#f8fbfa] py-4">
              <div className="text-center">
                <p className="flex items-center justify-center gap-1 text-lg font-bold text-slate-900">
                  {doctor.rating > 0 ? (
                    <>
                      <Star size={15} className="fill-amber-400 text-amber-400" />
                      {doctor.rating.toFixed(1)}
                    </>
                  ) : (
                    "—"
                  )}
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-xs">
                  {doctor.reviewCount > 0
                    ? `${doctor.reviewCount} ta sharh`
                    : "Hali sharh yo‘q"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">
                  {doctor.experience} yil
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-xs">
                  ish tajribasi
                </p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-slate-900 sm:text-lg">
                  {formatPrice(doctor.price)}
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-xs">
                  qabul narxi, so‘m
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-5">
            <motion.section
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
              className="rounded-[24px] border border-white bg-white p-6 shadow-[0_8px_35px_rgba(16,54,61,0.045)] transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-950/5"
            >
              <h2 className="text-lg font-bold tracking-[-0.035em] text-slate-900">
                Shifokor haqida
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {doctor.bio}
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                <Languages size={16} className="text-teal-700" />
                <p className="text-xs font-semibold text-slate-700">
                  Tillar:
                  <span className="ml-1 font-medium text-slate-500">
                    {doctor.languages.join(", ")}
                  </span>
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: 0.06 }}
              className="rounded-[24px] border border-white bg-white p-6 shadow-[0_8px_35px_rgba(16,54,61,0.045)] transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-950/5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-[-0.035em] text-slate-900">
                  Ish vaqti
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Qabulda
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {doctor.schedule.map((item) => (
                  <li
                    key={item.day}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-slate-500">{item.day}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                      <Clock3 size={13} className="text-teal-600" />
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-2xl bg-[#f5faf8] p-4">
                <p className="text-xs font-semibold text-slate-800">
                  {doctor.clinic}
                </p>
                <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-teal-700" />
                  {doctor.address}, {doctor.location}
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: 0.12 }}
              className="rounded-[24px] border border-white bg-white p-6 shadow-[0_8px_35px_rgba(16,54,61,0.045)] transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-950/5"
            >
              <h2 className="text-lg font-bold tracking-[-0.035em] text-slate-900">
                Sertifikatlar
              </h2>
              <ul className="mt-4 space-y-3">
                {doctor.certifications.map((certification) => (
                  <li
                    key={certification}
                    className="flex items-start gap-2.5 text-sm leading-5 text-slate-600"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {certification}
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          <motion.section
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: 0.08 }}
            className="rounded-[24px] border border-white bg-white p-5 shadow-[0_8px_35px_rgba(16,54,61,0.045)] transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-950/5 sm:p-7"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">
                  Mutaxassisdan
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-slate-900">
                  Video maslahatlar
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Sog‘lig‘ingiz uchun qisqa va foydali tavsiyalar.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {doctor.reels.length} ta video
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {doctor.reels.map((reel, index) => (
                <motion.button
                  type="button"
                  key={reel.id}
                  onClick={() => setSelectedReel(reel)}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.025 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                  className={`reel-tile group relative aspect-[0.78] overflow-hidden rounded-[18px] bg-slate-100 text-left shadow-md shadow-slate-900/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-950/20 ${
                    index === 0 && doctor.reels.length === 2
                      ? "sm:col-span-2 sm:aspect-[1.4]"
                      : ""
                  }`}
                  aria-label={`${reel.title} videosini ko‘rish`}
                >
                  <Image
                    src={reel.cover}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-slate-950/10 transition-colors group-hover:from-slate-950/90" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[9px] font-bold text-white backdrop-blur">
                    {reel.category}
                  </span>
                  <span className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Play size={16} fill="currentColor" />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 text-white">
                    <span className="line-clamp-2 block text-xs font-bold leading-5 sm:text-sm">
                      {reel.title}
                    </span>
                    <span className="mt-1.5 flex items-center justify-between text-[10px] font-medium text-white/75">
                      <span>{reel.views} ko‘rish</span>
                      <span>{reel.duration}</span>
                    </span>
                  </span>
                  <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                    <Play size={12} fill="currentColor" />
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-teal-50/70 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                <CalendarDays size={18} />
              </span>
              <p className="flex-1 text-xs leading-5 text-slate-600">
                Shifokor bilan shaxsan maslahatlashish uchun qabul vaqtini
                tanlang.
              </p>
              <button
                type="button"
                onClick={() => setSelectedDoctor(doctor)}
                className="shrink-0 rounded-full bg-teal-700 px-3.5 py-2 text-[11px] font-bold text-white transition hover:bg-teal-800 active:scale-95"
              >
                Yozilish
              </button>
            </div>
          </motion.section>
        </div>
      </div>

      {selectedReel && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReel(null);
              setCommentText("");
            }
          }}
        >
          <motion.section
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedReel.title}
            className="modal-card relative grid w-full max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-2xl md:grid-cols-[1.05fr_0.95fr]"
          >
            <button
              type="button"
              onClick={() => {
                setSelectedReel(null);
                setCommentText("");
              }}
              aria-label="Videoni yopish"
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65 md:hidden"
            >
              <X size={18} />
            </button>
            <div className="relative flex min-h-[300px] items-center justify-center bg-black md:min-h-[570px]">
              <video
                key={selectedReel.id}
                src={selectedReel.video}
                poster={selectedReel.cover}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] w-full object-contain"
              >
                Brauzeringiz video formatini qo‘llab-quvvatlamaydi.
              </video>
              <button
                type="button"
                onClick={() => {
                  setSelectedReel(null);
                  setCommentText("");
                }}
                aria-label="Videoni yopish"
                className="absolute right-4 top-4 hidden size-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65 md:flex"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex min-h-[460px] flex-col">
              <div className="flex items-center gap-3 border-b border-slate-100 p-5">
                <div className="relative size-11 overflow-hidden rounded-full bg-slate-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    unoptimized
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-slate-500">{doctor.specialtyUz}</p>
                </div>
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-800">
                  {selectedReel.category}
                </span>
              </div>
              <div className="border-b border-slate-100 px-5 py-4">
                <h3 className="text-base font-bold text-slate-900">
                  {selectedReel.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedReel.views} marta ko‘rildi
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setLikedReels((current) =>
                        current.includes(selectedReel.id)
                          ? current.filter((id) => id !== selectedReel.id)
                          : [...current, selectedReel.id],
                      )
                    }
                    aria-label={
                      likedReels.includes(selectedReel.id)
                        ? "Laykni olib tashlash"
                        : "Videoga layk bosish"
                    }
                    aria-pressed={likedReels.includes(selectedReel.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition ${
                      likedReels.includes(selectedReel.id)
                        ? "text-rose-500"
                        : "text-slate-500 hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={
                        likedReels.includes(selectedReel.id) ? "fill-current" : ""
                      }
                    />
                    {likedReels.includes(selectedReel.id) ? "Yoqdi" : "Yoqtirish"}
                  </button>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <MessageCircle size={17} /> {reelComments.length} izoh
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                {reelComments.map((comment, index) => (
                  <div className="flex gap-2.5" key={`${comment}-${index}`}>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[10px] font-bold text-teal-800">
                      {index === 0 ? "MK" : "SA"}
                    </span>
                    <p className="pt-1 text-xs leading-5 text-slate-600">
                      <span className="mr-1 font-bold text-slate-800">
                        {index === 0 ? "Malika" : "Sardor"}
                      </span>
                      {comment}
                    </p>
                  </div>
                ))}
                {reelComments.length === 0 && (
                  <p className="py-4 text-center text-xs text-slate-400">
                    Hali izoh yo‘q. Birinchi bo‘lib izoh qoldiring.
                  </p>
                )}
              </div>
              <form
                onSubmit={submitComment}
                className="flex items-center gap-2 border-t border-slate-100 p-4"
              >
                <input
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  aria-label="Izoh yozish"
                  placeholder="Izoh qo‘shing..."
                  className="min-w-0 flex-1 rounded-full bg-slate-50 px-4 py-2.5 text-xs outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-teal-100"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="rounded-full bg-teal-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Yuborish
                </button>
              </form>
            </div>
          </motion.section>
        </div>
      )}

      <AppointmentModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </>
  );
}
